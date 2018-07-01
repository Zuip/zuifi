<?php namespace App\Http\Controllers;

class ViewController extends \App\Http\Controllers\Controller {

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct($lang = NULL)
	{
    
    // If language is not set, set it
    /* if($lang == NULL) {
    
      // Default language is finnish
      $lang = "fi";
      
      // Change to english if it is chosen in URL
      if(\Request::segment(1) == "en") {
        $lang = "en";
      }
    } */
    
    // If language is not set, set default
    if($lang == NULL) {
      $lang = 'fi';
    }

    \App\Services\Languages\LanguageService::setLocale($lang);
		// $this->middleware('quest');
    
    // Because of the conflict with AngularJS templating tags, change
    // the templating tags of Laravel
    \Blade::setContentTags('<%', '%>');
    \Blade::setEscapedContentTags('<%%', '%%>');
	}
  
  public function renderPage()
  {
    return view('layout.body');
  }
  
  /**
  * Show the home page to the user
  */
	public function homePage()
	{
		return view('home');
	}
  
  /**
	 * Show the about page to the user
	 */
	public function aboutPage()
	{
		return view('about');
	}
  
  /**
	 * Show the category page to the user
	 */
	public function categoryPage($categoryURLName)
	{
    
    try {
      
      $languageFetcher = new \App\Services\Languages\LanguageFetcher();
      $language = $languageFetcher->getWithCode(\Session::get('language'));
      
      // Find category's language version with URL name
      $categoryLanguageFetcher = new \App\Services\Categories\LanguageVersionFetcher();
      $categoryLanguage = $categoryLanguageFetcher->findWithURLName($categoryURLName, $language);
    } catch(\App\Exceptions\ModelNotFoundException $e) {
      \App::abort(404);
    }
    
		return view('category', ['categoryName' => $categoryLanguage->name, 'categoryDescription' => $categoryLanguage->description]);
	}
  
  /**
  * Show the admin page to the user
  */
	public function adminPage()
	{
		return view('admin/admin');
	}
  
  /**
  * Show the admin page to the user
  */
	public function adminCategoriesPage()
	{
		return view('admin/categories');
	}
  
  /**
  * Show the admin view's new category page to the user
  */
	public function adminAddCategoryPage($categoryId, $parentId)
	{
		return view('admin/category', ['category_id' => $categoryId, 'parent_id' => $parentId]);
	}
  
  /**
  * Show the admin view's edit category page to the user
  */
	public function adminEditCategoryPage($categoryId)
	{
    try {
      
      $languageFetcher = new \App\Services\Languages\LanguageFetcher();
      $language = $languageFetcher->getWithCode(\Session::get('language'));
      
      $categoryLanguageVersionFetcher = new \App\Services\Categories\LanguageVersionFetcher();
      $categoryLanguage = $categoryLanguageVersionFetcher->findWithCategoryId(
        $categoryId,
        $language
      );
    } catch(\App\Exceptions\ModelNotFoundException $e) {
      \App::abort(404);
    }

		return view('admin/category', [
                'category_id' => $categoryId,
                'categoryName' => $categoryLanguage->name,
                'categoryDescription' => $categoryLanguage->description,
                'categoryURLName' => $categoryLanguage->url_name
    ]);
	}
  
  /**
	 * Show the login view to the user
	 */
	public function loginPage()
	{
    if (\Auth::check()) {
      return view('alreadyLogged');
    }
    
		return view('login');
	}
  
  /**
  * Show the log out view to the user
  */
	public function logOutPage()
	{ 
    \Auth::logout();
    
		return view('logout');
	}
}