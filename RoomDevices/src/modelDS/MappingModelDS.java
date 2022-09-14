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

import bean.MappingBean;
import model.MappingModel;

public class MappingModelDS implements MappingModel {

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

	private static final String TABLE_NAME = "mapping";

	@Override
	public void doSave(MappingBean mapping) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		String insertSQL = "INSERT INTO " + MappingModelDS.TABLE_NAME
				+ " (idUser) VALUES (?)";

		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(insertSQL, PreparedStatement.RETURN_GENERATED_KEYS);
			preparedStatement.setString(1, mapping.getIdUser());
			
			preparedStatement.executeUpdate();

			ResultSet generatedKeysResultSet = preparedStatement.getGeneratedKeys();
					// first row of this set will contain generated keys
					// in our case it will contain only one row and only one column - generated id
			generatedKeysResultSet.next(); // executing next() method to navigate to first row of generated keys (like with any other result set)
			int id = (int) generatedKeysResultSet.getLong(1); // since our row contains only one column we won't miss with the column index :)

			mapping.setIdMapping(id);
			
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
	public boolean doDeleteByUser(String idUser) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		int result = 0;



		String deleteSQL = "DELETE FROM " + MappingModelDS.TABLE_NAME + " WHERE idUser = ?";

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
	public boolean doDelete(int idMapping) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		int result = 0;



		String deleteSQL = "DELETE FROM " + MappingModelDS.TABLE_NAME + " WHERE idMapping = ?";

		try {
			
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(deleteSQL);
			preparedStatement.setInt(1, idMapping);

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
	public MappingBean doRetrieveByUser(String idUser) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		MappingBean bean = new MappingBean();

		String selectSQL = "SELECT * FROM " + MappingModelDS.TABLE_NAME + " WHERE idUser = ?";

		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(selectSQL);
			preparedStatement.setString(1, idUser);

			ResultSet rs = preparedStatement.executeQuery();

			while (rs.next()) {
				
				bean.setIdMapping(rs.getInt("idMapping"));
				bean.setIdUser(rs.getString("idUser"));
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
	public MappingBean doRetrieveById(int idMapping) throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		MappingBean bean = new MappingBean();

		String selectSQL = "SELECT * FROM " + MappingModelDS.TABLE_NAME + " WHERE idMapping = ?";

		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(selectSQL);
			preparedStatement.setInt(1, idMapping);

			ResultSet rs = preparedStatement.executeQuery();

			while (rs.next()) {
				
				bean.setIdMapping(rs.getInt("idMapping"));
				bean.setIdUser(rs.getString("idUser"));
				
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
	public ArrayList<MappingBean> doRetrieveAll() throws SQLException {
		Connection connection = null;
		PreparedStatement preparedStatement = null;

		ArrayList<MappingBean> mappings = new ArrayList<MappingBean>();

		String selectSQL = "SELECT * FROM " + MappingModelDS.TABLE_NAME;

		try {
			connection = ds.getConnection();
			preparedStatement = connection.prepareStatement(selectSQL);

			ResultSet rs = preparedStatement.executeQuery();

			while (rs.next()) {
				MappingBean bean = new MappingBean();

				bean.setIdMapping(rs.getInt("idMapping"));
				bean.setIdUser(rs.getString("idUser"));
				

				mappings.add(bean);		// Aggiungiamo il bean alla collezione.
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
		return mappings;
	}

}
