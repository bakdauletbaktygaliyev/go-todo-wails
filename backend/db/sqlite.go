package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"log"
	"todo-app/backend/models"
)

var DB *gorm.DB

func InitDB() {
	var err error
	DB, err = gorm.Open(sqlite.Open("tasks.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database")
	}

	models.Migrate(DB)
}
