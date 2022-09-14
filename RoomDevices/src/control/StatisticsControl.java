package control;

import java.io.IOException;

import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import bean.MappingBean;
import bean.PreferencesBean;
import bean.TaskBean;
import bean.TestBean;
import bean.UserBean;
import bean.WrapperBean;
import model.MappingModel;
import model.PreferencesModel;
import model.TaskModel;
import model.TestModel;
import model.UserModel;
import modelDS.MappingModelDS;
import modelDS.PreferencesModelDS;
import modelDS.TaskModelDS;
import modelDS.TestModelDS;
import modelDS.UserModelDS;

/**
 * Implements:
 * - Show general info (tests executed, users, average tests per user, mappings registered)
 * - Show all preferences by task id, ordered by the most used combination
 * - Show all preferences by user id, ordered by the most used combination
 * - Show all the tests executed, by user
 * - Show all the mapping registered, by user
 */
@WebServlet("/statistics")
public class StatisticsControl extends HttpServlet {
	private static final long serialVersionUID = 1L;
   
	static TestModel testModel = new TestModelDS();
	static TaskModel taskModel = new TaskModelDS();
	static UserModel userModel = new UserModelDS();
	static PreferencesModel preferencesModel = new PreferencesModelDS();
	static MappingModel mappingModel = new MappingModelDS();


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String statsOperation = request.getParameter("statsOperation");

		// restituisce le info generali
		if(statsOperation.equals("seeGeneralInfo")) {
			try {
				ArrayList<TestBean> allTestsArray = testModel.doRetrieveAll();
				int testsQty = allTestsArray.size();
				
				ArrayList<UserBean> allUsersArray = userModel.doRetrieveAll();
				int usersQty = allUsersArray.size();
								
				ArrayList<MappingBean> allMappingsArray = mappingModel.doRetrieveAll();
				int mappingsQty = allMappingsArray.size();
				
				float testsPerUserAvg = (float) testsQty/usersQty;
				
				request.setAttribute("testsQty", testsQty);
				request.setAttribute("usersQty", usersQty);
				request.setAttribute("testsPerUserAvg", testsPerUserAvg);
				request.setAttribute("mappingsQty", mappingsQty);

				RequestDispatcher view = request.getRequestDispatcher("stats.jsp");
				view.forward(request, response);

				

			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 
			

		}
		
		// restituisce le preferences dato un user id in input
		// restituisce tutte le preferences se dato in input "all"
	if(statsOperation.equals("searchByUser")) {
	 
		// prendo un user
		// mi mostra la tabella con nome task, descrizione, device, 
		  
		 
		try {
				String idUser = request.getParameter("idUser");

			ArrayList<TestBean> testToSend = new ArrayList<TestBean>();

			ArrayList<PreferencesBean> preferences = preferencesModel.doRetrieveAll();
			ArrayList<WrapperBean> wrappers = new ArrayList<WrapperBean>();


			ArrayList<UserBean> userTest = userModel.doRetrieveAll(); // tutti gli utenti
			
			ArrayList<TestBean> testPerUser = new ArrayList<TestBean>(); 
			
			if(idUser.equals("ALL")) {
				testPerUser = testModel.doRetrieveAll();
				for(PreferencesBean p : preferences) {
					wrappers.addAll(preferencesModel.doRetrieveFavoriteMoveSequences(p.getIdTask(), p.getDevice()));
				}
			} else {
				testPerUser = testModel.doRetrieveByUser(idUser);
			
				for(PreferencesBean p : preferences) {
					wrappers.addAll(preferencesModel.doRetrieveUserFavoriteMoveSequences(idUser, p.getIdTask(), p.getDevice()));
				}
				}
			
			
			for (int i = 0; i < wrappers.size(); i++){
				for (int j = i + 1; j < wrappers.size(); j++) {       
				 if (wrappers.get(i).getIdPreference() == wrappers.get(j).getIdPreference()) {    
				 wrappers.remove(j);
				   j--;
				  }
				 }
				}
			
			
			Collections.sort(wrappers, new Comparator<WrapperBean>() {
			    @Override
			    public int compare(WrapperBean p1, WrapperBean p2) {
			        if (p1.getIdTask().compareTo(p2.getIdTask())>0)
			            return 1;
			        if (p1.getIdTask().compareTo(p2.getIdTask())<0)
			            return -1;
			        return 0;
			    }
			});
		
			ArrayList<TaskBean> tasks = taskModel.doRetrieveAll();
			request.setAttribute("arrayPrefs", preferences);
			request.setAttribute("arrayWraps", wrappers);
			request.setAttribute("arrayTasks", tasks);
			request.setAttribute("arrayUsers", userTest);
			request.setAttribute("chosenUserId", idUser);
	
		
			RequestDispatcher view = request.getRequestDispatcher("searchbyuser.jsp");
			view.forward(request, response);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} // tutti i test di tutti
		
		}			
	
	
		// restituisce le preferences dato un task id in input
		// restituisce tutte le preferences se dato in input "all"
		if(statsOperation.equals("searchByTask")) {
		
				try {
				
				String idTask = request.getParameter("idTask");
				
				String[] devices = {"smartbulb", "smartcurtain", "smartspeaker"};
				ArrayList<WrapperBean> prefs = new ArrayList<WrapperBean>();
				
				
					ArrayList<TaskBean> tasks = taskModel.doRetrieveAll();
					ArrayList<String> nameTasks = new ArrayList<String>();

					for(int i=0; i<tasks.size(); i=i+3) {
						String idTask1 = tasks.get(i).getIdTask();
						nameTasks.add(idTask1);
						}
					System.out.println(nameTasks.toString());
				
					
				if(idTask.equals("ALL")) {
					for(int i=0; i<devices.length; i++) {
						for(int j=0;j<nameTasks.size(); j++) {
							ArrayList<WrapperBean> singlePref = preferencesModel.doRetrieveFavoriteMoveSequences(nameTasks.get(j), devices[i]);
							prefs.addAll(singlePref);
						}
						
					}
				} else {
				for(int i=0; i<devices.length; i++) {
						ArrayList<WrapperBean> singlePref = preferencesModel.doRetrieveFavoriteMoveSequences(idTask, devices[i]);
						if(!singlePref.isEmpty()) prefs.addAll(singlePref);
					}
				}
				
				
				Collections.sort(prefs, new Comparator<WrapperBean>() {
				    @Override
				    public int compare(WrapperBean p1, WrapperBean p2) {
				        if (p1.getIdTask().compareTo(p2.getIdTask())>0)
				            return 1;
				        if (p1.getIdTask().compareTo(p2.getIdTask())<0)
				            return -1;
				        return 0;
				    }
				});
				
				System.out.println("stats:"+prefs);
			

				request.setAttribute("arrayPrefs", prefs);
				request.setAttribute("arrayNameTasks", nameTasks);
				request.setAttribute("chosenTaskId", idTask);
				
				RequestDispatcher view = request.getRequestDispatcher("searchbytask.jsp");
				view.forward(request, response);

				
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}
		
		
	}
	

}
