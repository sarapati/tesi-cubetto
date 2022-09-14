package bean;

import java.io.Serializable;

public class TaskBean implements Serializable {

	private String idTask, device, type, description;

	public TaskBean() {
		this.idTask = "";
		this.device = "";
		this.type = "";
		this.description = "";
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "TaskBean [idTask=" + idTask + ", device=" + device + ", type=" + type + ", description=" + description
				+ "]";
	}
	
	
}
