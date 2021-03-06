class TasksController < ApplicationController

  def index
    @tasks = Task.all
    respond_with(@tasks)
  end

  def show
    @task = Task.find(params[:id])
    respond_with(@task)
  end

  def create
    @task = Task.create(optional_params)
    respond_with(@task, location: @task)
  end

  def update
    @task = Task.find(params[:id])
    @task.update_attributes(done_params)
    respond_with(@task, location: @task)
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    respond_with(nil, location: tasks_path)
  end

  private

  def optional_params
    params.require(:task).permit(:name, :date)
  end

  def done_params
    params.require(:task).permit(:is_done)
  end
end
