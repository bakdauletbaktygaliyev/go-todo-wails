package main

import (
	"context"
	"fmt"
	"todo-app/backend"
	"todo-app/backend/models"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// GetAllTasks fetches all tasks from SQLite
func (a *App) GetAllTasks() ([]models.Task, error) {
	return backend.GetAllTasks()
}

// AddTask adds a new task
func (a *App) AddTask(title string, priority string, dueDate string) error {
	return backend.AddTask(title, priority, dueDate)
}

// DeleteTask removes a task by ID
func (a *App) DeleteTask(id uint) error {
	return backend.DeleteTask(id)
}

// ToggleTaskCompletion marks a task as done/undone
func (a *App) ToggleTaskCompletion(id uint) error {
	return backend.ToggleTaskCompletion(id)
}
