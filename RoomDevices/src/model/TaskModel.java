package model;

import java.sql.SQLException;
import java.util.ArrayList;

import bean.TaskBean;

public interface TaskModel {

	public void doSave(TaskBean task) throws SQLException;

	public boolean doDelete(String idTask, String device) throws SQLException;

	public TaskBean doRetrieveByKey(String idTask, String device) throws SQLException;

	public ArrayList<TaskBean> doRetrieveByTask(String idTask) throws SQLException;

	public ArrayList<TaskBean> doRetrieveByDevice(String device) throws SQLException;

	public ArrayList<TaskBean> doRetrieveByTaskType(String type) throws SQLException;

	public ArrayList<TaskBean> doRetrieveAll() throws SQLException;

	public boolean doUpdate(String idTask, String device, TaskBean newTask) throws SQLException;
	
	
}
