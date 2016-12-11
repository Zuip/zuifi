<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryLanguageVersion extends Model {

	// The database table used by the model.
	protected $table = 'categorytext';

	// The attributes that are mass assignable.
	protected $fillable = ['id', 'name', 'description', 'urlname', 'published', 'language_id', 'category_id'];

	// The attributes excluded from the model's JSON form.
	protected $hidden = [];
  
  // No default timestamps
  public $timestamps = false;
  
  // Returns the category the language version belongs to
  public function category() {
    return $this->belongsTo('\\App\\Models\\Category', 'category_id');
  }
}