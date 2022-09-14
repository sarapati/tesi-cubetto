package model;

import java.sql.SQLException;
import java.util.ArrayList;

import bean.UserBean;

public interface UserModel {

	public void doSave(UserBean user) throws SQLException;

	public boolean doDelete(String idUser) throws SQLException;

	public UserBean doRetrieveByKey(String idUser) throws SQLException;

	public ArrayList<UserBean> doRetrieveByJob(String job) throws SQLException;

	public ArrayList<UserBean> doRetrieveByAgeRange(int fromAge, int toAge) throws SQLException;

	public ArrayList<UserBean> doRetrieveAll() throws SQLException;

	public boolean doUpdate(String idUser, UserBean newUser) throws SQLException;
	
	
}
