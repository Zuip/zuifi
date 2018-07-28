<?php

Route::get('/articles', 'ArticlesController@get');
Route::get(
  '/trips/{tripUrlName}/{countryUrlName}/{cityUrlName}/article',
  'ArticleController@get'
);
Route::get('/cities', 'CitiesController@get');
Route::get('/user', 'SessionController@getCurrentUser');
Route::get('/users', 'UsersController@get');
Route::get('/users/{userId}/trips', 'TripsController@get');
Route::post('/login', 'SessionController@login');
Route::post('/logout', 'SessionController@logout');
