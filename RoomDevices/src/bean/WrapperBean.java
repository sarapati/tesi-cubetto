package bean;

import java.io.Serializable;

public class WrapperBean implements Serializable {

	private String idTask, device, description;
	private String moveSequence;
	private int idPreference, totalCount;
	
	public WrapperBean(int idPreference, String idTask, String device, String description, String moveSequence, int totalCount) {
		this.idPreference = idPreference;
		this.idTask = idTask;
		this.device = device;
		this.description = description;
		this.moveSequence = moveSequence;
		this.totalCount = totalCount;
	}

	public int getIdPreference() {
		return idPreference;
	}

	public void setIdPreference(int idPreference) {
		this.idPreference = idPreference;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getMoveSequence() {
		return moveSequence;
	}

	public void setMoveSequence(String moveSequence) {
		this.moveSequence = moveSequence;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	@Override
	public String toString() {
		return "WrapperBean [idPreference=" + idPreference + ", idTask=" + idTask + ", device=" + device + ", description=" + description
				+ ", moveSequence=" + moveSequence + ", totalCount=" + totalCount + "]";
	}
	
	
}
