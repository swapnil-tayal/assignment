<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        /* CSS for the list */
        ul {
            list-style-type: none;
            /* Remove bullet points */
            padding: 0;
            margin: 0;
        }

        .lidiv {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ddd;
            /* Border between rows */
            padding: 10px;
        }

        .lidiv>div {
            flex: 1;
            /* Each column occupies equal space */
        }

        button {
            background-color: #4CAF50;
            /* Green */
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            border-radius: 5px;
            border: none;
            cursor: pointer;
        }

        button:hover {
            background-color: #45a049;
            /* Darker green on hover */
        }

        li {
            margin-bottom: 10px;
            /* Spacing between list items */
            background-color: #f4f4f4;
            /* Background color */
            border-radius: 5px;
            /* Rounded corners */
        }

        li:first-child .lidiv {
            font-weight: bold;
            /* Bold font for the header row */
        }
    </style>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
        const handleClick = (buttonId) => {
            console.log(buttonId);
            $.ajax({
                url: 'swapnil',
                type: "POST",
                data: {
                    userId: buttonId
                },
                success: function(response) {
                    console.log("sucess");
                },
                error: function(xhr, status, error) {
                    console.log('Error', error);
                }
            })
        }
    </script>
</head>

<body>
</body>

</html>

<?php

class assignment extends Optmyzr_controller
{

    public function getEmail()
    {
    }

    public function getata()
    {

        // add data

        // $data = array(
        //     'userid' => 321,
        //     'fullname' => 'john',
        //     'email' => "j3oshn2@gmail.com",
        //     'phone' => 981222234331,
        //     "role" => 1,
        //     "password" => 'swdrswa',
        //     "verified" => 1,
        //     "customertype" => 3,
        //     "parentId" => 43,
        //     "loginType" => '1',
        // );

        // $this->db->insert('users', $data);

        // if ($this->db->affected_rows() > 0) {
        //     echo "Data inserted successfully.<br>";
        // } else {
        //     echo "Failed to insert data.<br>";
        // }

        $query = $this->db->get('users');
        $results = $query->result();

        echo '<ul>';

        echo "<li>
        <div class='lidiv'>
            <div> userid </div>  
            <div> fullname </div> 
            <div> email </div> 
        </div>
        <div>
            FETCH
        </div>
        </li>";
        foreach ($results as $row) {
            echo
            "<li>
                    <div class='lidiv'>
                        <div>{$row->userid}</div>  
                        <div>{$row->fullname}</div> 
                        <div>{$row->email}</div> 
                    </div>
                    <div>
                        <button id={$row->userid} onclick=handleClick(this.id) >
                            FETCH
                        </button>
                    </div>
                </li>";
        }
        echo '<ul>';


        // $userId = $_POST['userId'];
        // echo "<h1>{$userId}<h1>";
    }
}
?>
