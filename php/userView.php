<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <ul id="userData"></ul>

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

    <script>
        const handleClick = async (id) => {
            console.log(id);
            const response = await fetch(`handleFetch/${id}`);
            const data = await response.json();
            var userDataList = document.getElementById("userData");

            var html = "";

            for(var i=0; i<data.length; i++){
                html += "<li>" + data[i].userid + " " + data[i].email + "<li>";
            }
            userDataList.innerHTML = html;
        }
    </script>

</head>

<body>


    <?php

    echo '<ul>';
    echo "
    <li>
        <div class='lidiv'>
            <div> userid </div>  
            <div> fullname </div> 
            <div> email </div> 
        </div>
        <div>
            FETCH
        </div>
    </li>";
    foreach ($users as $row) {
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
    ?>

</body>

</html>
