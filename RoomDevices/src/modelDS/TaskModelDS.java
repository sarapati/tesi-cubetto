package modelDS;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import bean.TaskBean;
import model.TaskModel;

public class TaskModelDS implements TaskModel {

	private static DataSource ds;


	static {
		try {
			Context initCtx = new InitialContext();
			Context envCtx = (Context) initCtx.lookup("java:comp/env");

			ds = (DataSource) envCtx.lookup("jdbc/tactcube");

		} catch (NamingException e) {
			System.out.println("Error:" + e.getMessage());
		}
	}

	private static final String TABLE_NAME = "task";

	@Override
	public void doSave(TaskBean task) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		String insertSQL = "INSERT INTO " + TaskModelDS.TABLE_NAME
				+ " (idTask, device, type, description) VALUES (?, ?, ?, ?)";

		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(insertSQL);
			preparedStatement.setString(1, task.getIdTask());
			preparedStatement.setString(2, task.getDevice());
			preparedStatement.setString(3, task.getType());
			preparedStatement.setString(4, task.getDescription());

			preparedStatement.executeUpdate();


		} finally {
			try {
				if (preparedStatement != null)
					preparedStatement.close();
			} finally {
				if (connection != null)
					connection.close();
			}
		}
	}

	@Override
	public boolean doDelete(String idTask, String device) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		int result = 0;



		String deleteSQL = "DELETE FROM " + TaskModelDS.TABLE_NAME + " WHERE idTask = ? AND device = ?";

		try {
			
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(deleteSQL);
			preparedStatement.setString(1, idTask);
			preparedStatement.setString(2, device);

			result = preparedStatement.executeUpdate();

		} finally {
			try {
				if (preparedStatement != null)
					preparedStatement.close();
			} finally {
				if (connection != null)
					connection.close();
			}
		}
		return (result != 0);
	}

	@Override
	public TaskBean doRetrieveByKey(String idTask, String device) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		TaskBean bean = new TaskBean();

		String selectSQL = "SELECT * FROM " + TaskModelDS.TABLE_NAME + " WHERE idTask = ? AND device = ?";
		
		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(selectSQL);
			preparedStatement.setString(1, idTask);
			preparedStatement.setString(2, device);
			
			ResultSet rs = preparedStatement.executeQuery();

			while (rs.next()) {
				bean.setIdTask(rs.getString("idTask"));
				bean.setDevice(rs.getString("device"));
				bean.setType(rs.getString("type"));
				bean.setDescription(rs.getString("description"));
			}

		} finally {
			try {
				if (preparedStatement != null)
					preparedStatement.close();
			} finally {
				if (connection != null)
					connection.close();
			}
		}
		return bean;
	}

	@Override
	public ArrayList<TaskBean> doRetrieveByTask(String idTask) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		
		ArrayList<TaskBean> tasks = new ArrayList<TaskBean>();

		String selectSQL = "SELECT * FROM "+TaskModelDS.TABLE_NAME+" WHERE idTask = ? ";
		

		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(selectSQL);
			preparedStatement.setString(1, idTask);

			ResultSet rs = preparedStatement.executeQuery();

			while (rs.next()) {
				TaskBean bean = new TaskBean();
								
				bean.setIdTask(rs.getString("idTask"));
				bean.setDevice(rs.getString("device"));
				bean.setType(rs.getString("type"));
				bean.setDescription(rs.getString("description"));
				
				tasks.add(bean);	// Aggiungiamo il bean alla collezione.
			}

		} finally {
			try {
				if (preparedStatement != null)
					preparedStatement.close();
			} finally {
				if (connection != null)
					connection.close();
			}
		}
		
		return tasks;
	}

	@Override
	public ArrayList<TaskBean> doRetrieveByDevice(String device) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		
		ArrayList<TaskBean> tasks = new ArrayList<TaskBean>();

		String selectSQL = "SELECT * FROM "+TaskModelDS.TABLE_NAME+" WHERE device = ? ";
		

		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(selectSQL);
			preparedStatement.setString(1, device);

			ResultSet rs = preparedStatement.executeQuery();

			while (rs.next()) {
				TaskBean bean = new TaskBean();
								
				bean.setIdTask(rs.getString("idTask"));
				bean.setDevice(rs.getString("device"));
				bean.setType(rs.getString("type"));
				bean.setDescription(rs.getString("description"));
				
				tasks.add(bean);	// Aggiungiamo il bean alla collezione.
			}

		} finally {
			try {
				if (preparedStatement != null)
					preparedStatement.close();
			} finally {
				if (connection != null)
					connection.close();
			}
		}
		
		return tasks;
	}

	@Override
	public ArrayList<TaskBean> doRetrieveByTaskType(String type) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		
		ArrayList<TaskBean> tasks = new ArrayList<TaskBean>();

		String selectSQL = "SELECT * FROM "+TaskModelDS.TABLE_NAME+" WHERE type = ? ";
		

		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(selectSQL);
			preparedStatement.setString(1, type);

			ResultSet rs = preparedStatement.executeQuery();

			while (rs.next()) {
				TaskBean bean = new TaskBean();
								
				bean.setIdTask(rs.getString("idTask"));
				bean.setDevice(rs.getString("device"));
				bean.setType(rs.getString("type"));
				bean.setDescription(rs.getString("description"));
				
				tasks.add(bean);	// Aggiungiamo il bean alla collezione.
			}

		} finally {
			try {
				if (preparedStatement != null)
					preparedStatement.close();
			} finally {
				if (connection != null)
					connection.close();
			}
		}
		
		return tasks;
	}

	@Override
	public ArrayList<TaskBean> doRetrieveAll() throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		ArrayList<TaskBean> tasks = new ArrayList<TaskBean>();

		String selectSQL = "SELECT * FROM " + TaskModelDS.TABLE_NAME;

		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(selectSQL);

			ResultSet rs = preparedStatement.executeQuery();

			while (rs.next()) {
				TaskBean bean = new TaskBean();

				bean.setIdTask(rs.getString("idTask"));
				bean.setDevice(rs.getString("device"));
				bean.setType(rs.getString("type"));
				bean.setDescription(rs.getString("description"));
				
				tasks.add(bean);		// Aggiungiamo il bean alla collezione.
			}

		} finally {
			try {
				if (preparedStatement != null)
					preparedStatement.close();
			} finally {
				if (connection != null)
					connection.close();
			}
		}
		return tasks;
	}

	@Override
	public boolean doUpdate(String idTask, String device, TaskBean newTask) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		int result = 0;
		

		String updateSQL = "UPDATE " + TaskModelDS.TABLE_NAME + " SET type = ?, description = ? WHERE idTask = ? AND device = ?";
 
		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(updateSQL);
			preparedStatement.setString(1, newTask.getType());
			preparedStatement.setString(2, newTask.getDescription());
			preparedStatement.setString(3, idTask);
			preparedStatement.setString(4, device);

			result = preparedStatement.executeUpdate();

		} finally {
			try {
				if (preparedStatement != null)
					preparedStatement.close();
			} finally {
				if (connection != null)
					connection.close();
			}
		}

		return result != 0;
	}

}
