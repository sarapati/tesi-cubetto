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

import bean.PreferencesBean;
import bean.WrapperBean;
import model.PreferencesModel;

public class PreferencesModelDS implements PreferencesModel {
	
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

	private static final String TABLE_NAME = "preferences";


	@Override
	public void doSave(PreferencesBean preference) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		String insertSQL = "INSERT INTO " + PreferencesModelDS.TABLE_NAME
				+ " (idTask, device, moveSequence, idTest) VALUES (?, ?, ?, ?)";

		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(insertSQL, PreparedStatement.RETURN_GENERATED_KEYS);
			preparedStatement.setString(1, preference.getIdTask());
			preparedStatement.setString(2, preference.getDevice());
			preparedStatement.setString(3, preference.getMoveSequence());
			preparedStatement.setInt(4, preference.getIdTest());

			preparedStatement.executeUpdate();

			
			ResultSet generatedKeysResultSet = preparedStatement.getGeneratedKeys();
			generatedKeysResultSet.next(); // executing next() method to navigate to first row of generated keys (like with any other result set)
			int id = (int) generatedKeysResultSet.getLong(1); // since our row contains only one column we won't miss with the column index :)

			preference.setIdPreference(id);
	

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
	public boolean doDeleteAllByTest(int idTest) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		int result = 0;



		String deleteSQL = "DELETE FROM " + PreferencesModelDS.TABLE_NAME + " WHERE idTest = ?";

		try {
			
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(deleteSQL);
			preparedStatement.setInt(1, idTest);

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
	public boolean doDeleteAllByTask(String idTask, String device) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		int result = 0;



		String deleteSQL = "DELETE FROM " + PreferencesModelDS.TABLE_NAME + " WHERE idTask = ? AND device = ?";

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
	public PreferencesBean doRetrieveById(int idPreference) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		PreferencesBean bean = new PreferencesBean();
		
		ArrayList<PreferencesBean> preferences = new ArrayList<PreferencesBean>();

		String selectSQL = "SELECT * FROM "+PreferencesModelDS.TABLE_NAME+" WHERE idPreference = ? ";
		

		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(selectSQL);
			preparedStatement.setInt(1, idPreference);

			ResultSet rs = preparedStatement.executeQuery();

			while (rs.next()) {
				bean.setIdPreference(rs.getInt("idPreference"));
				bean.setIdTask(rs.getString("idTask"));
				bean.setDevice(rs.getString("device"));
				bean.setMoveSequence(rs.getString("moveSequence"));
				bean.setIdTest(rs.getInt("idTest"));
				bean.setIdMapping(rs.getInt("idMapping"));
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
	public ArrayList<PreferencesBean> doRetrieveByTest(int idTest) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		
		ArrayList<PreferencesBean> preferences = new ArrayList<PreferencesBean>();

		String selectSQL = "SELECT * FROM "+PreferencesModelDS.TABLE_NAME+" WHERE idTest = ? ";
		

		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(selectSQL);
			preparedStatement.setInt(1, idTest);

			ResultSet rs = preparedStatement.executeQuery();

			while (rs.next()) {
				PreferencesBean bean = new PreferencesBean();
								
				bean.setIdPreference(rs.getInt("idPreference"));
				bean.setIdTask(rs.getString("idTask"));
				bean.setDevice(rs.getString("device"));
				bean.setMoveSequence(rs.getString("moveSequence"));
				bean.setIdTest(rs.getInt("idTest"));
				bean.setIdMapping(rs.getInt("idMapping"));
			
				preferences.add(bean);	// Aggiungiamo il bean alla collezione.
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
		
		return preferences;
	}
	
	@Override
	public ArrayList<PreferencesBean> doRetrieveByMapping(int idMapping) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		
		ArrayList<PreferencesBean> preferences = new ArrayList<PreferencesBean>();

		String selectSQL = "SELECT * FROM "+PreferencesModelDS.TABLE_NAME+" WHERE idMapping = ? ";
		

		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(selectSQL);
			preparedStatement.setInt(1, idMapping);

			ResultSet rs = preparedStatement.executeQuery();

			while (rs.next()) {
				PreferencesBean bean = new PreferencesBean();
								
				bean.setIdPreference(rs.getInt("idPreference"));
				bean.setIdTask(rs.getString("idTask"));
				bean.setDevice(rs.getString("device"));
				bean.setMoveSequence(rs.getString("moveSequence"));
				bean.setIdTest(rs.getInt("idTest"));
				bean.setIdMapping(rs.getInt("idMapping"));
			
				preferences.add(bean);	// Aggiungiamo il bean alla collezione.
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
		
		return preferences;
	}

	@Override
	public PreferencesBean doRetrieveByTaskUser(int idTest, String idTask, String device) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		PreferencesBean bean = new PreferencesBean();

		String selectSQL = "SELECT * FROM " + PreferencesModelDS.TABLE_NAME + " WHERE idTest = ? AND idTask = ? AND device = ?";

		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(selectSQL);
			preparedStatement.setInt(1, idTest);
			preparedStatement.setString(2, idTask);
			preparedStatement.setString(3, device);

			ResultSet rs = preparedStatement.executeQuery();

			while (rs.next()) {
				bean.setIdPreference(rs.getInt("idPreference"));
				bean.setIdTask(rs.getString("idTask"));
				bean.setDevice(rs.getString("device"));
				bean.setMoveSequence(rs.getString("moveSequence"));
				bean.setIdTest(rs.getInt("idTest"));
				bean.setIdMapping(rs.getInt("idMapping"));
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
	public ArrayList<PreferencesBean> doRetrieveAll() throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		ArrayList<PreferencesBean> preferences = new ArrayList<PreferencesBean>();

		String selectSQL = "SELECT * FROM " + PreferencesModelDS.TABLE_NAME;

		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(selectSQL);

			ResultSet rs = preparedStatement.executeQuery();

			while (rs.next()) {
				PreferencesBean bean = new PreferencesBean();

				bean.setIdPreference(rs.getInt("idPreference"));
				bean.setIdTask(rs.getString("idTask"));
				bean.setDevice(rs.getString("device"));
				bean.setMoveSequence(rs.getString("moveSequence"));
				bean.setIdTest(rs.getInt("idTest"));
				bean.setIdMapping(rs.getInt("idMapping"));
			
				preferences.add(bean);		// Aggiungiamo il bean alla collezione.
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
		return preferences;
	}

	@Override
	public ArrayList<WrapperBean> doRetrieveFavoriteMoveSequences(String idTask, String device) throws SQLException {
	Connection connection = null;
	PreparedStatement preparedStatement = null;

	ArrayList<WrapperBean> wrappers = new ArrayList<WrapperBean>();

	String selectSQL = "SELECT idPreference,"+ PreferencesModelDS.TABLE_NAME+".idTask, "+PreferencesModelDS.TABLE_NAME+".device, description, moveSequence, COUNT(*) AS totalCount FROM " + 
						PreferencesModelDS.TABLE_NAME + 
						" INNER JOIN task ON task.idTask = "+ PreferencesModelDS.TABLE_NAME +".idTask AND task.device = "+PreferencesModelDS.TABLE_NAME+".device" +
						" WHERE "+ PreferencesModelDS.TABLE_NAME +".idTask = ? AND "+ PreferencesModelDS.TABLE_NAME +".device = ? GROUP BY moveSequence";
	try {
		connection = ds.getConnection();
		preparedStatement = connection.prepareStatement(selectSQL);
		preparedStatement.setString(1, idTask);
		preparedStatement.setString(2, device);

		ResultSet rs = preparedStatement.executeQuery();

		while (rs.next()) {
			WrapperBean bean = new WrapperBean(rs.getInt("idPreference"), rs.getString("idTask"), rs.getString("device"), rs.getString("description"), rs.getString("moveSequence"), rs.getInt("totalCount"));
			wrappers.add(bean);
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
	return wrappers;
}

	
	@Override
	public ArrayList<WrapperBean> doRetrieveUserFavoriteMoveSequences(String idUser, String idTask, String device)
			throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		ArrayList<WrapperBean> wrappers = new ArrayList<WrapperBean>();

		String selectSQL = "SELECT idPreference,"+ PreferencesModelDS.TABLE_NAME+".idTask, "+PreferencesModelDS.TABLE_NAME+".device, description, moveSequence, COUNT(*) AS totalCount FROM " + 
							PreferencesModelDS.TABLE_NAME + 
							" INNER JOIN task ON task.idTask = "+ PreferencesModelDS.TABLE_NAME +".idTask AND task.device = "+PreferencesModelDS.TABLE_NAME+".device" +
							" INNER JOIN test ON test.idTest = "+ PreferencesModelDS.TABLE_NAME +".idTest" +
							" WHERE test.idUser = ? AND "+ PreferencesModelDS.TABLE_NAME +".idTask = ? AND "+ PreferencesModelDS.TABLE_NAME +".device = ? GROUP BY moveSequence";
		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(selectSQL);
			preparedStatement.setString(1, idUser);
			preparedStatement.setString(2, idTask);
			preparedStatement.setString(3, device);

			ResultSet rs = preparedStatement.executeQuery();

			while (rs.next()) {
				WrapperBean bean = new WrapperBean(rs.getInt("idPreference"), rs.getString("idTask"), rs.getString("device"), rs.getString("description"), rs.getString("moveSequence"), rs.getInt("totalCount"));
				wrappers.add(bean);
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
		return wrappers;
	}
	
	
	@Override
	public boolean doUpdateMappingId(int idPreference, int idMapping) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;
		
		int result = 0;
		
		
		String updateSQL = "UPDATE " +PreferencesModelDS.TABLE_NAME + " SET idMapping = ? WHERE idPreference = ?";

		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(updateSQL);
			preparedStatement.setInt(1, idMapping);
			preparedStatement.setInt(2, idPreference);

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
