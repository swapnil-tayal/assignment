<?php

    class userModel extends CI_Model{
        public function __construct(){
            parent::__construct();
            $this->load->database();
        }
        public function getDataModel(){
            $query = $this->db->get('users');
            $results = $query->result();
            return $results;
        }
        public function getUserAccount($userId){
            $query = $this->db->get_where("addedaccounts", array('userId' => $userId));
            if(!$query){
                return null;
            }
            if($query->num_rows() == 0){
                return array();
            }
            return $query->result();
        }
    }
?>
