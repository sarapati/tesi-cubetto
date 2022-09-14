package model;

import java.sql.SQLException;
import java.util.ArrayList;

import bean.MappingBean;



public interface MappingModel {
public void doSave(MappingBean mapping) throws SQLException;
	
	public boolean doDeleteByUser(String idUser) throws SQLException;
	
	public boolean doDelete(int idMapping) throws SQLException;
	
	public MappingBean doRetrieveByUser(String idUser) throws SQLException;

	public MappingBean doRetrieveById(int idMapping) throws SQLException;

	public ArrayList<MappingBean> doRetrieveAll() throws SQLException;
	
}
