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

import bean.UserBean;
import model.UserModel;

public class UserModelDS implements UserModel {

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

	private static final String TABLE_NAME = "user";


	@Override
	public void doSave(UserBean user) throws SQLException {


		Connection connection = null;
		PreparedStatement preparedStatement = null;

		String insertSQL = "INSERT INTO " + UserModelDS.TABLE_NAME
				+ " (idUser, name, surname, age, job, notes) VALUES (?, ?, ?, ?, ?, ?)";

		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(insertSQL);
			preparedStatement.setString(1, user.getIdUser());
			preparedStatement.setString(2, user.getName());
			preparedStatement.setString(3, user.getSurname());
			preparedStatement.setInt(4, user.getAge());
			preparedStatement.setString(5, user.getJob());
			preparedStatement.setString(6, user.getNotes());

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
	public boolean doDelete(String idUser) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		int result = 0;



		String deleteSQL = "DELETE FROM " + UserModelDS.TABLE_NAME + " WHERE idUser = ?";

		try {
			
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(deleteSQL);
			preparedStatement.setString(1, idUser);

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
	public UserBean doRetrieveByKey(String idUser) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		UserBean bean = new UserBean();

		String selectSQL = "SELECT * FROM " + UserModelDS.TABLE_NAME + " WHERE idUser = ?";

		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(selectSQL);
			preparedStatement.setString(1, idUser);

			ResultSet rs = preparedStatement.executeQuery();

			while (rs.next()) {
				bean.setIdUser(rs.getString("idUser"));
				bean.setName(rs.getString("name"));
				bean.setSurname(rs.getString("surname"));
				bean.setAge(rs.getInt("age"));
				bean.setJob(rs.getString("job"));
				bean.setNotes(rs.getString("notes"));
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
	public ArrayList<UserBean> doRetrieveByJob(String job) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		
		ArrayList<UserBean> users = new ArrayList<UserBean>();

		String selectSQL = "SELECT * FROM "+UserModelDS.TABLE_NAME+" WHERE job LIKE ? ";
		

		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(selectSQL);
			preparedStatement.setString(1,"%"+ job+"%");

			ResultSet rs = preparedStatement.executeQuery();

			while (rs.next()) {
				UserBean bean = new UserBean();
								
				bean.setIdUser(rs.getString("idUser"));
				bean.setName(rs.getString("name"));
				bean.setSurname(rs.getString("surname"));
				bean.setAge(rs.getInt("age"));
				bean.setJob(rs.getString("job"));
				bean.setNotes(rs.getString("notes"));

				users.add(bean);	// Aggiungiamo il bean alla collezione.
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
		
		return users;
	}

	@Override
	public ArrayList<UserBean> doRetrieveByAgeRange(int fromAge, int toAge) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		
		ArrayList<UserBean> users = new ArrayList<UserBean>();

		String selectSQL = "SELECT * FROM "+UserModelDS.TABLE_NAME+" WHERE age BETWEEN ? AND ? ";
		

		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(selectSQL);
			preparedStatement.setInt(1, fromAge);
			preparedStatement.setInt(2, toAge);

			ResultSet rs = preparedStatement.executeQuery();

			while (rs.next()) {
				UserBean bean = new UserBean();
								
				bean.setIdUser(rs.getString("idUser"));
				bean.setName(rs.getString("name"));
				bean.setSurname(rs.getString("surname"));
				bean.setAge(rs.getInt("age"));
				bean.setJob(rs.getString("job"));
				bean.setNotes(rs.getString("notes"));

				users.add(bean);	// Aggiungiamo il bean alla collezione.
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
		
		return users;
	}

	@Override
	public ArrayList<UserBean> doRetrieveAll() throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		ArrayList<UserBean> users = new ArrayList<UserBean>();

		String selectSQL = "SELECT * FROM " + UserModelDS.TABLE_NAME;

		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(selectSQL);

			ResultSet rs = preparedStatement.executeQuery();

			while (rs.next()) {
				UserBean bean = new UserBean();

				bean.setIdUser(rs.getString("idUser"));
				bean.setName(rs.getString("name"));
				bean.setSurname(rs.getString("surname"));
				bean.setAge(rs.getInt("age"));
				bean.setJob(rs.getString("job"));			
				bean.setNotes(rs.getString("notes"));

				users.add(bean);		// Aggiungiamo il bean alla collezione.
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
		return users;
	}

	@Override
	public boolean doUpdate(String idUser, UserBean newUser) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		int result = 0;
		

		String updateSQL = "UPDATE " + UserModelDS.TABLE_NAME + " SET name = ?, surname = ?, age = ?, job = ?, notes = ? WHERE idUser = ?";
 
		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(updateSQL);
			preparedStatement.setString(1, newUser.getName());
			preparedStatement.setString(2, newUser.getSurname());
			preparedStatement.setInt(3, newUser.getAge());
			preparedStatement.setString(4, newUser.getJob());
			preparedStatement.setString(5, newUser.getNotes());
			preparedStatement.setString(6, idUser);

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
