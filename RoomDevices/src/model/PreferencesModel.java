package model;

import java.sql.SQLException;
import java.util.ArrayList;

import bean.PreferencesBean;
import bean.WrapperBean;

public interface PreferencesModel {
public void doSave(PreferencesBean preference) throws SQLException;
	
	public boolean doDeleteAllByTest(int idTest) throws SQLException;

	public boolean doDeleteAllByTask(String idTask, String device) throws SQLException;
	
	public PreferencesBean doRetrieveById(int idPreference) throws SQLException;

	public ArrayList<PreferencesBean> doRetrieveByTest(int idTest) throws SQLException;

	public ArrayList<PreferencesBean> doRetrieveByMapping(int idMapping) throws SQLException;

	public PreferencesBean doRetrieveByTaskUser(int idTest, String idTask, String device) throws SQLException;

	public ArrayList<PreferencesBean> doRetrieveAll() throws SQLException;
	
	public ArrayList<WrapperBean> doRetrieveFavoriteMoveSequences(String idTask, String device) throws SQLException;

	public ArrayList<WrapperBean> doRetrieveUserFavoriteMoveSequences(String idUser, String idTask, String device) throws SQLException;

	public boolean doUpdateMappingId(int idPreference, int idMapping) throws SQLException;
}
