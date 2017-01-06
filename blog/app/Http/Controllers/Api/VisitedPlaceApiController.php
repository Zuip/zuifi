<?php namespace App\Http\Controllers\Api;

class VisitedPlaceApiController {
  
  public function getVisitedPlaces($language) {
    
    $visitedPlacesService = new \App\Services\VisitedPlacesService();
    
    $visitedPlaces = $visitedPlacesService->getVisitedPlaces();
    
    $visitedPlacesArray = array();
    
    foreach($visitedPlaces as $visitedPlace) {
      $visitedPlacesArray[] = array(
        "name" => $visitedPlace->locationname,
        "lat" => intval($visitedPlace->lat),
        "lng" => intval($visitedPlace->lng)
      );
    }
    
    return \Response::json(array(
      "texts" => array(
        "topic" => \Lang::get('views.about.topic', array(), $language),
        "aboutWriter" => \Lang::get('views.about.aboutWriter', array(), $language),
        "placesVisited" => \Lang::get('views.about.placesVisited', array(), $language)
      ),
      "visitedPlaces" => $visitedPlacesArray
    ));
  }
  
  public function addVisitedPlace() {
    
  }
  
  public function updateVisitedPlace() {
    
  }
  
  public function removeVisitedPlace() {
    
  }
}