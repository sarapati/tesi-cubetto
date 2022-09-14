package model;

import java.sql.SQLException;
import java.util.ArrayList;

import bean.TestBean;

public interface TestModel {
	
	public void doSave(TestBean test) throws SQLException;
	
	public boolean doDeleteAllByUser(String idUser) throws SQLException;
	
	public boolean doDelete(int idTest) throws SQLException;
	
	public ArrayList<TestBean> doRetrieveByUser(String idUser) throws SQLException;

	public TestBean doRetrieveByTest(int idTest) throws SQLException;

	public ArrayList<TestBean> doRetrieveAll() throws SQLException;
	
}
