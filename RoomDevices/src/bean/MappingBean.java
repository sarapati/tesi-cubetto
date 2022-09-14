package bean;

import java.io.Serializable;

public class MappingBean implements Serializable {
	private int idMapping;
	private String idUser;

	public MappingBean() {
		this.idMapping = 0;
		this.idUser = "";
	}

	public int getIdMapping() {
		return idMapping;
	}

	public void setIdMapping(int idMapping) {
		this.idMapping = idMapping;
	}

	public String getIdUser() {
		return idUser;
	}

	public void setIdUser(String idUser) {
		this.idUser = idUser;
	}

	@Override
	public String toString() {
		return "MappingBean [idMapping=" + idMapping + ", idUser=" + idUser + "]";
	}

	
}
