package bean;

import java.io.Serializable;

public class PreferencesBean implements Serializable {
	private int idPreference, idTest, idMapping;
	private String idTask, device, moveSequence;
	public PreferencesBean() {
		this.idPreference = 0;
		this.idTest = 0;
		this.idMapping = 0;
		this.idTask = "";
		this.device = "";
		this.moveSequence = "";
	}
	public int getIdPreference() {
		return idPreference;
	}
	public void setIdPreference(int idPreference) {
		this.idPreference = idPreference;
	}
	public int getIdTest() {
		return idTest;
	}
	public void setIdTest(int idTest) {
		this.idTest = idTest;
	}
	public int getIdMapping() {
		return idMapping;
	}
	public void setIdMapping(int idMapping) {
		this.idMapping = idMapping;
	}
	public String getIdTask() {
		return idTask;
	}
	public void setIdTask(String idTask) {
		this.idTask = idTask;
	}
	public String getDevice() {
		return device;
	}
	public void setDevice(String device) {
		this.device = device;
	}
	public String getMoveSequence() {
		return moveSequence;
	}
	public void setMoveSequence(String moveSequence) {
		this.moveSequence = moveSequence;
	}
	@Override
	public String toString() {
		return "PreferencesBean [idPreference=" + idPreference + ", idTest=" + idTest + ", idMapping=" + idMapping
				+ ", idTask=" + idTask + ", device=" + device + ", moveSequence=" + moveSequence + "]";
	}
	
	
}
