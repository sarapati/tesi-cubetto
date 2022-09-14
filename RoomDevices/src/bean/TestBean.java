package bean;

import java.io.Serializable;

public class TestBean implements Serializable {
	private int idTest;
	private String idUser;

	public TestBean() {
		this.idTest = 0;
		this.idUser = "";
	}

	public int getIdTest() {
		return idTest;
	}

	public void setIdTest(int idTest) {
		this.idTest = idTest;
	}

	public String getIdUser() {
		return idUser;
	}

	public void setIdUser(String idUser) {
		this.idUser = idUser;
	}

	@Override
	public String toString() {
		return "TestBean [idTest=" + idTest + ", idUser=" + idUser + "]";
	}
	
}
