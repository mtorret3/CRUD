<?php
namespace Src;

class User {
  private $db;
  private $requestMethod;
  private $userId;
  private $state;
  private $edit;
  private $delete;


  public function __construct($db, $requestMethod, $userId, $state, $edit, $delete)
  {
    $this->db = $db;
    $this->requestMethod = $requestMethod;
    $this->userId = $userId;
    $this->state = $state;
    $this->edit = $edit;
    $this->delete = $delete;
  }

  public function processRequest()
  {
    switch ($this->requestMethod) {
      case 'GET':
        if ($this->userId) {
          $response = $this->getUser($this->userId);
        }elseif ($this->state == 1) {
          $response = $this->getAllStates();
        } else {
          $response = $this->getAllUsers();
        };
        break;
      case 'POST':
        if ($this->edit == 1) {
          $response = $this->updateUser($this->userId);
        }elseif ($this->delete == 1) {
          $response = $this->deleteUser($this->userId);
        } else{
          $response = $this->createUser();
        }
        
        break;
      case 'PUT':
        $response = $this->updateUser($this->userId);
        break;
      case 'DELETE':
        $response = $this->deleteUser($this->userId);
        break;
      default:
        $response = $this->notFoundResponse();
        break;
    }
    header($response['status_code_header']);
    if ($response['body']) {
      echo $response['body'];
    }
  }

  private function getAllUsers()
  {
    $query = "
      SELECT
        u.PK_USERS,
        u.NICKNAME,
        u.NAME,
        u.PHONE,
        u.ADRESS,
        u.CITY,
        e.estado AS STATE
      FROM
        USERS u
      INNER JOIN STATES e
      ON u.STATE = e.id;
    ";

    try {
      $statement = $this->db->query($query);
      $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
    } catch (\PDOException $e) {
      exit($e->getMessage());
    }

    $response['status_code_header'] = 'HTTP/1.1 200 OK';
    $response['body'] = json_encode($result);
    return $response;
  }

  private function getUser($id)
  {
    $result = $this->find($id);
    if (! $result) {
      return $this->notFoundResponse();
    }
    $response['status_code_header'] = 'HTTP/1.1 200 OK';
    $response['body'] = json_encode($result);
    return $response;
  }

  private function createUser()
  {
    $input = (array) json_decode(file_get_contents('php://input'), TRUE);

    // print_r($input);
    // exit();
    if (! $this->validatePost($input)) {
      return $this->unprocessableEntityResponse();
    }

    $query = "
      INSERT INTO USERS
        (NICKNAME, NAME, PHONE, ADRESS,CITY,STATE,PASSWORD)
      VALUES
        (:nickname, :name, :phone, :adress, :city, :state, :password);
    ";

    try {
      $statement = $this->db->prepare($query);
      $statement->execute(array(
        'nickname' => $input['nickname'],
        'name'  => $input['name'],
        'phone' => $input['phone'],
        'adress' => $input['adress'],
        'city' => $input['city'],
        'state' => $input['state'],
        'password' => md5($input['password']),
      ));
      $statement->rowCount();
    } catch (\PDOException $e) {
      exit($e->getMessage());
    }

    $response['status_code_header'] = 'HTTP/1.1 201 Created';
    $response['body'] = json_encode(array('message' => 'Post Created'));
    return $response;
  }

  private function updateUser($id)
  {
    $result = $this->find($id);

    if (! $result) {
      return $this->notFoundResponse();
    }

    $input = (array) json_decode(file_get_contents('php://input'), TRUE);

    if (! $this->validatePost($input)) {
      return $this->unprocessableEntityResponse();
    }

    $statement = "
      UPDATE USERS
      SET
        nickname = :nickname,
        name  = :name,
        phone = :phone,
        adress = :adress,
        city = :city,
        state = :state,
        password = :password
      WHERE PK_USERS = :id;
    ";

    try {
      $statement = $this->db->prepare($statement);


      $statement->execute(array(
        'id' => (int) $id,
        'nickname' => $input['nickname'],
        'name'  => $input['name'],
        'phone' => $input['phone'],
        'adress' => $input['adress'],
        'city' => $input['city'],
        'state' => $input['state'],
        'password' => md5($input['password']),
      ));
      $statement->rowCount();
    } catch (\PDOException $e) {
      exit($e->getMessage());
    }
    $response['status_code_header'] = 'HTTP/1.1 200 OK';
    $response['body'] = json_encode(array('message' => 'Post Updated!'));
    return $response;
  }

  private function deleteUser($id)
  {
    $result = $this->find($id);

    if (! $result) {
      return $this->notFoundResponse();
    }

    $query = "
      DELETE FROM USERS
      WHERE PK_USERS = :id;
    ";

    try {
      $statement = $this->db->prepare($query);
      $statement->execute(array('id' => $id));
      $statement->rowCount();
    } catch (\PDOException $e) {
      exit($e->getMessage());
    }
    $response['status_code_header'] = 'HTTP/1.1 200 OK';
    $response['body'] = json_encode(array('message' => 'Post Deleted!'));
    return $response;
  }

  public function find($id)
  {
    $query = "
      SELECT
        PK_USERS, NICKNAME, NAME, PHONE, ADRESS,CITY,STATE,PASSWORD
      FROM
        USERS
      WHERE PK_USERS = :id;
    ";

    try {
      $statement = $this->db->prepare($query);
      $statement->execute(array('id' => $id));
      $result = $statement->fetch(\PDO::FETCH_ASSOC);
      return $result;
    } catch (\PDOException $e) {
      exit($e->getMessage());
    }
  }

  private function getAllStates()
  {
    $query = "SELECT * FROM STATES;";

    try {
      $statement = $this->db->query($query);
      $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
    } catch (\PDOException $e) {
      exit($e->getMessage());
    }

    $response['status_code_header'] = 'HTTP/1.1 200 OK';
    $response['body'] = json_encode($result);
    return $response;
  }

  private function validatePost($input)
  {
    if (! isset($input['nickname'])) {
      return false;
    }
    if (! isset($input['phone'])) {
      return false;
    }

    return true;
  }

  private function unprocessableEntityResponse()
  {
    $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
    $response['body'] = json_encode([
      'error' => 'Invalid input'
    ]);
    return $response;
  }

  private function notFoundResponse()
  {
    $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
    $response['body'] = null;
    return $response;
  }
}