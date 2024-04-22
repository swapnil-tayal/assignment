<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <form action="swapnil" method="post">
        <label>username</label>
        <input type="text" name="username">
        <input type="submit" name="login">
    </form>
</body>

</html>

<?php

class assignment extends Optmyzr_controller
{
    public function getata()
    {

        $data = array(
            'userid' => 321,
            'fullname' => 'john',
            'email' => "j3oshn2@gmail.com",
            'phone' => 981222234331,
            "role" => 1,
            "password" => 'swdrswa',
            "verified" => 1,
            "customertype" => 3,
            "parentId" => 43,
            "loginType" => '1',
        );

        $this->db->insert('users', $data);

        if ($this->db->affected_rows() > 0) {
            echo "Data inserted successfully.<br>";
        } else {
            echo "Failed to insert data.<br>";
        }

        $query = $this->db->get('users');
        $results = $query->result();

        echo '<br>';
        foreach ($results as $row) {
            echo "User ID: " . $row->userid . "<br>";
            echo "Username: " . $row->fullname . "<br>";
            echo "User ID: " . $row->email . "<br>";
            echo "Username: " . $row->phone . "<br>";
            echo "User ID: " . $row->role . "<br>";
            echo "Username: " . $row->password . "<br>";
            echo "<br>";
        }
    }
}
?>
