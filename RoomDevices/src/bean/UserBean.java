package bean;

import java.io.Serializable;

public class UserBean implements Serializable {
	private String idUser, name, surname;
	private int age;
	private String job, notes;
	
	
	public UserBean() {
		this.idUser = "";
		this.name = "";
		this.surname = "";
		this.age = 0;
		this.job = "";
		this.notes = "";
	}


	public String getIdUser() {
		return idUser;
	}


	public void setIdUser(String idUser) {
		this.idUser = idUser;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getSurname() {
		return surname;
	}


	public void setSurname(String surname) {
		this.surname = surname;
	}


	public int getAge() {
		return age;
	}


	public void setAge(int age) {
		this.age = age;
	}


	public String getJob() {
		return job;
	}


	public void setJob(String job) {
		this.job = job;
	}

	public String getNotes() {
		return notes;
	}


	public void setNotes(String notes) {
		this.notes = notes;
	}


	@Override
	public String toString() {
		return "UserBean [idUser=" + idUser + ", name=" + name + ", surname=" + surname + ", age=" + age + ", job="
				+ job + ", notes=" + notes + "]";
	}


	
	
}
