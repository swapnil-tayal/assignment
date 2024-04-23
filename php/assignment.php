<?php

class assignment extends Optmyzr_controller{

    public function __construct(){
        parent::__construct();
        $this->load->model("userModel");
    }

    public function getData(){
        $data["users"] = $this->userModel->getDataModel();
        $this->load->view("userView", $data);
    }

    public function handleFetch($id){
        $accountData = $this->userModel->getUserAccount($id);
        header('Content-Type: application/json');
        echo json_encode($accountData);
    }
}
?>
