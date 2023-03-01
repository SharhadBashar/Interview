<?php

namespace App\UserDataModels;

use Illuminate\Database\Eloquent\Model;

class FavoriteCategories extends Model
{
    /**
     * The database used by the model.
     *
     * @var string
     */                               
    protected $connection = 'mysqluser';
                                        
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'user_favorite_categories';
}
