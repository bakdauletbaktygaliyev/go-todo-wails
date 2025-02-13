package backend

import (
	"time"
	database "todo-app/backend/db"
	"todo-app/backend/models"
)

// gets all tasks from SQLite
func GetAllTasks() ([]models.Task, error) {
	var tasks []models.Task
	result := database.DB.Find(&tasks)
	return tasks, result.Error
}

// will add new task into db
func AddTask(title string, priority string, dueDate string) error {
	date, _ := time.Parse("2006-01-02", dueDate)

	task := models.Task{
		Title:    title,
		Done:     false,
		Priority: priority,
		DueDate:  date,
	}

	return database.DB.Create(&task).Error
}

// will remove task by ID
func DeleteTask(id uint) error {
	return database.DB.Delete(&models.Task{}, id).Error
}

// will mark task as done or undone
func ToggleTaskCompletion(id uint) error {
	var task models.Task
	if err := database.DB.First(&task, id).Error; err != nil {
		return err
	}
	task.Done = !task.Done
	return database.DB.Save(&task).Error
}
