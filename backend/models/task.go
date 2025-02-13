package models

import (
	"gorm.io/gorm"
	"time"
)

type Task struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Title     string    `json:"title"`
	Done      bool      `json:"done"`
	Priority  string    `json:"priority"` // low, medium, high
	DueDate   time.Time `json:"dueDate"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func Migrate(db *gorm.DB) {
	db.AutoMigrate(&Task{})
}
