package control;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Random;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

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

@WebServlet("/mapping")
public class MappingTestControl extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private Gson gson = new Gson();

	ArrayList<TestBean> tests = null;
	ArrayList<TaskBean> tasks = null;
	ArrayList<UserBean> users = null;
	ArrayList<PreferencesBean> preferences = null;
	ArrayList<MappingBean> mappings = null;

	static int idValue = 0;

	static TestModel testModel = new TestModelDS();
	static TaskModel taskModel = new TaskModelDS();
	static UserModel userModel = new UserModelDS();
	static PreferencesModel preferencesModel = new PreferencesModelDS();
	static MappingModel mappingModel = new MappingModelDS();



	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {


		String mappingOperation = request.getParameter("mappingOperation");

		// riceve i dati dell'utente, crea un nuovo utente
		// restituisce l'utente alla jsp
		if(mappingOperation.equals("saveUserData")) {

			String userName = request.getParameter("userName");
			String userSurname = request.getParameter("userSurname");
			String userAge = request.getParameter("userAge");
			String userJob = request.getParameter("userJob");
			String userNotes = request.getParameter("userNotes");

			boolean ready = true;
			String field = null;

			if(userJob.isBlank()) {
				response.setStatus(400);
				field = "userJob";
				ready = false;
			} 
			if(userAge.isBlank()) {
				response.setStatus(400);
				field = "userAge";
				ready = false;
			}if(userSurname.isBlank()) {
				response.setStatus(400);
				field = "userSurname";
				ready = false;

			}if(userName.isBlank()) {
				response.setStatus(400);
				field = "userName";
				ready = false;
			} 

			if(ready) {
				try {
					UserBean user = new UserBean();
					idValue++;

					user.setName(userName);
					user.setSurname(userSurname);
					user.setAge(Integer.parseInt(userAge));
					user.setJob(userJob);
					user.setNotes(userNotes);

					Calendar date = new GregorianCalendar();

					Random r = new Random();
					String letter = (char)(r.nextInt(26) + 'a')+"";

					String idUser = idValue+userName.toUpperCase().substring(0, 2)+userSurname.toUpperCase().substring(0, 2)+userAge+date.get(Calendar.YEAR)+letter.toUpperCase();
					user.setIdUser(idUser); 

					userModel.doSave(user); //utente salvato

					request.getSession().setAttribute("userInSession", user);
					field = this.gson.toJson(user);

				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					field = "error";
				} 

			}

			PrintWriter out = response.getWriter();
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			out.print(field);
			out.flush(); 

		}

		// riceve id dell'utente, ritrova oggetto utente
		// restituisce l'utente alla jsp
		if(mappingOperation.equals("findUserData")) {
			String field = null;
		
			String idUser = request.getParameter("idUser");
			
			try {
				
				UserBean user = userModel.doRetrieveByKey(idUser);			
				request.getSession().setAttribute("userInSession", user);

				field = this.gson.toJson(user);
				  
				if(idUser.isBlank() || user.getIdUser().isBlank()) {
					response.setStatus(400);
					field = "idUser";
				} 
				
				PrintWriter out = response.getWriter();
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				out.print(field);
				out.flush(); 
				
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 

			
		}

		// riceve l'id dell'utente che vuole iniziare il test, crea un test
		// restituisce la lista di task per le domande
		if(mappingOperation.equals("startTest")) {
			try {
				String idUser = request.getParameter("idUser");
				TestBean test = new TestBean();
				test.setIdUser(idUser);
				testModel.doSave(test);

				ArrayList<TaskBean> taskArrayNavigation = taskModel.doRetrieveByTaskType("navigation");
				ArrayList<TaskBean> taskArrayAction = taskModel.doRetrieveByTaskType("action");
				ArrayList<TaskBean> taskArrayFeedback = taskModel.doRetrieveByTaskType("feedback");

				ArrayList<TaskBean> questions = new ArrayList<TaskBean>();
				questions.addAll(taskArrayNavigation);
				questions.addAll(taskArrayAction);

				Collections.shuffle(questions);
				Collections.shuffle(taskArrayFeedback);


				for(int j = 0; j<questions.size(); j++) {
					if(questions.get(j).getIdTask().equals("EA1") && (questions.get(j).getDevice().equals("smartbulb") || questions.get(j).getDevice().equals("smartcurtain"))) {
						questions.remove(j);
					
					}
				}

			/*	ArrayList<TaskBean> prova = new ArrayList<TaskBean>();

				for(int j = 0; j<taskArrayAction.size(); j++) {
					if(taskArrayAction.get(j).getIdTask().equals("DA1") 
							|| taskArrayAction.get(j).getIdTask().equals("DA3-") 
							|| taskArrayAction.get(j).getIdTask().equals("DA3+") 
							|| taskArrayAction.get(j).getIdTask().equals("DA2")) {
						prova.add(taskArrayAction.get(j));
					}
				}
				Collections.shuffle(prova);


			 	*/
				String testIdJsonString = this.gson.toJson(test.getIdTest());
				String feedbacksJsonString = this.gson.toJson(taskArrayFeedback);
				String questionsJsonString = this.gson.toJson(questions);
				PrintWriter out = response.getWriter();
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				String the3Json = "["+testIdJsonString+","+questionsJsonString+","+feedbacksJsonString+"]"; //Put all objects in an array of 3 elements
				out.print(the3Json);
				out.flush();   

			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 


		}


		if(mappingOperation.equals("savePreference")) {

			try {
				String chosen_cmd = request.getParameter("chosen_cmd");
				String task = request.getParameter("question");
				String idTest = request.getParameter("idTest");


				TaskBean executedTask = this.gson.fromJson(task,TaskBean.class);

				PreferencesBean preference = new PreferencesBean();

				preference.setIdTest(Integer.parseInt(idTest));
				preference.setIdTask(executedTask.getIdTask());
				preference.setDevice(executedTask.getDevice());
				preference.setMoveSequence(chosen_cmd);

				preferencesModel.doSave(preference);


				if(executedTask.getIdTask().equals("EA1")) {
					preference.setDevice("smartbulb");		
					preferencesModel.doSave(preference);
					preference.setDevice("smartcurtain");		
					preferencesModel.doSave(preference);
				}

			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}


		if(mappingOperation.equals("seeTest")) {

			try {

				String idTest = request.getParameter("idTest");
				UserBean userInSession = (UserBean) request.getSession().getAttribute("userInSession");
				String idUser = userInSession.getIdUser();
				ArrayList<TestBean> testToSend = new ArrayList<TestBean>();

				ArrayList<PreferencesBean> preferences = new ArrayList<PreferencesBean>();

				ArrayList<UserBean> userTest = new ArrayList<UserBean>();

				// se mandi idTest alla servlet, sei alla fine di un new test
				if(idTest!= null) {
					preferences.addAll(preferencesModel.doRetrieveByTest(Integer.parseInt(idTest)));
					testToSend.add(testModel.doRetrieveByTest(Integer.parseInt(idTest)));
					userTest.add(userModel.doRetrieveByKey(idUser));
				} 
				// altrimenti vuoi vedere i test senza creare new test
				else {
					ArrayList<TestBean> testPerUser = new ArrayList<TestBean>();
					//se non sei admin vuoi vedere il tuo
					if(!idUser.equals("admin"))		{
						testPerUser = testModel.doRetrieveByUser(idUser); //tutti i tuoi test
						userTest.add(userModel.doRetrieveByKey(idUser)); // aggiungi te stesso
					}
					//se sei admin vuoi vedere tutto di tutti
					else {
						testPerUser = testModel.doRetrieveAll(); // tutti i test di tutti
						userTest.addAll(userModel.doRetrieveAll()); // tutti gli utenti
					}

					for(int ind = 0; ind<testPerUser.size(); ind++) {
						preferences.addAll(preferencesModel.doRetrieveByTest(testPerUser.get(ind).getIdTest()));
						testToSend.add(testModel.doRetrieveByTest(testPerUser.get(ind).getIdTest()));
					}
				}


				Collections.sort(preferences, new Comparator<PreferencesBean>() {
					@Override
					public int compare(PreferencesBean p1, PreferencesBean p2) {
						if (p1.getIdTask().compareTo(p2.getIdTask())>0)
							return 1;
						if (p1.getIdTask().compareTo(p2.getIdTask())<0)
							return -1;
						return 0;
					}
				});
				ArrayList<TaskBean> tasks = taskModel.doRetrieveAll();
				request.setAttribute("arrayTests", testToSend);
				request.setAttribute("arrayPreferences", preferences);
				request.setAttribute("arrayTasks", tasks);
				request.setAttribute("arrayUsers", userTest);
				request.getSession().setAttribute("userInSession", userInSession);

				System.out.println(preferences.toString());

				RequestDispatcher view = request.getRequestDispatcher("usertest.jsp");
				view.forward(request, response);


			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}


		if(mappingOperation.equals("setAsDefaultMapping")) {
			try {
				String idTest = request.getParameter("idTest");
				TestBean test = testModel.doRetrieveByTest(Integer.parseInt(idTest));
				
				MappingBean mapping = new MappingBean();
				String idUserCurrent = test.getIdUser();
				mapping.setIdUser(idUserCurrent);
				MappingBean m = mappingModel.doRetrieveByUser(idUserCurrent);
				if(m!=null) {

					mappingModel.doDeleteByUser(idUserCurrent);
				}
				mappingModel.doSave(mapping);

				ArrayList<PreferencesBean> preferencesPerTest = preferencesModel.doRetrieveByTest(Integer.parseInt(idTest));
				for(PreferencesBean p : preferencesPerTest) {
					preferencesModel.doUpdateMappingId(p.getIdPreference(), mappingModel.doRetrieveByUser(idUserCurrent).getIdMapping());
				}


			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 


		}

		if(mappingOperation.equals("goToCreateMapping")) {
			try {	
				ArrayList<UserBean> allUsers = userModel.doRetrieveAll();


				request.setAttribute("arrayUsers", allUsers);

				RequestDispatcher view = request.getRequestDispatcher("createmapping.jsp");
				view.forward(request, response);

			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 
		}

		if(mappingOperation.equals("seePreferencesMapping")) {
			try {	
				String idUser = request.getParameter("idUser");
					/*ottenuto l'id dell'utente, voglio vedere tutte le sue preference
				 * si deve vedere una serie di tabelle, ordinate per id task
				 * le colonne saranno id task, device, description, moveseq, count
				 * le righe di una tab avrà un solo task per tutti i disp, 
				 * ordinati per count
				 * 
				 * quindi c'è bisogno di inviare una lista con tutti i task eseguiti
				 * dall'id user, ordinati
				 * 
				 * l'id user sarà associato a vari test, ogni test avrà associato 
				 * le preferences dell'user obv.
				 * 
				 * quindi bisogna prendere tutti i tests di user, e poi tutte le prefs
				 * di tests, e poi da questi ottenere la stima di total count col metodo
				 * apposito, che mi restituirà i wrappers
				 * 
				 * devo ritornare i wrappers
				 */

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
				request.setAttribute("idUserMapping", idUser);
		
			
				RequestDispatcher view = request.getRequestDispatcher("createmapping.jsp");
				view.forward(request, response);

			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 
		}

		if(mappingOperation.equals("createMapping")) {
			try {
				
				String idUserMapping = request.getParameter("idUserMapping");
				String listIds = request.getParameter("listIds");
			
				String mappingResult = "false";
				
				String[] arr = listIds.split(",");
				
				// check if user mapping already exist
				MappingBean m = mappingModel.doRetrieveByUser(idUserMapping);
				if(m!=null) {

					mappingModel.doDeleteByUser(idUserMapping);
				}
				
				// creating new user mapping
				MappingBean mapping = new MappingBean();
				mapping.setIdUser(idUserMapping);
				mappingModel.doSave(mapping);

				// set field mapping for each preference chosen
				for(int j=0; j<arr.length;j++) {
					PreferencesBean preferencePerId = preferencesModel.doRetrieveById(Integer.parseInt(arr[j]));
					preferencesModel.doUpdateMappingId(preferencePerId.getIdPreference(), mappingModel.doRetrieveByUser(idUserMapping).getIdMapping());
					
				}

				mappingResult = "true";
				ArrayList<UserBean> allUsers = userModel.doRetrieveAll();
				
				request.setAttribute("mappingResult", mappingResult);
				request.setAttribute("arrayUsers", allUsers);
				
				
				RequestDispatcher view = request.getRequestDispatcher("createmapping.jsp");
				view.forward(request, response);

			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 


		}
		
		if(mappingOperation.equals("seeMapping")) {
			try {

				UserBean userInSession = (UserBean) request.getSession().getAttribute("userInSession");
				String idUser = userInSession.getIdUser();
				ArrayList<MappingBean> mappingToSend = new ArrayList<MappingBean>();

				ArrayList<PreferencesBean> preferences = new ArrayList<PreferencesBean>();

				ArrayList<UserBean> userTest = new ArrayList<UserBean>();

				ArrayList<MappingBean> mappingPerUser = new ArrayList<MappingBean>();
					//se non sei admin vuoi vedere il tuo
					if(!idUser.equals("admin"))		{
						mappingPerUser.add(mappingModel.doRetrieveByUser(idUser));//il tuo mapping
						userTest.add(userModel.doRetrieveByKey(idUser)); // aggiungi te stesso
					}
					//se sei admin vuoi vedere tutto di tutti
					else {
						mappingPerUser =mappingModel.doRetrieveAll(); // il mapping di tutti
						userTest.addAll(userModel.doRetrieveAll()); // tutti gli utenti
					}

					for(int ind = 0; ind<mappingPerUser.size(); ind++) {
						preferences.addAll(preferencesModel.doRetrieveByMapping(mappingPerUser.get(ind).getIdMapping()));
						mappingToSend.add(mappingModel.doRetrieveById(mappingPerUser.get(ind).getIdMapping()));
					}
				

				Collections.sort(preferences, new Comparator<PreferencesBean>() {
					@Override
					public int compare(PreferencesBean p1, PreferencesBean p2) {
						if (p1.getIdTask().compareTo(p2.getIdTask())>0)
							return 1;
						if (p1.getIdTask().compareTo(p2.getIdTask())<0)
							return -1;
						return 0;
					}
				});
				ArrayList<TaskBean> tasks = taskModel.doRetrieveAll();
				request.setAttribute("arrayMappings", mappingToSend);
				request.setAttribute("arrayPreferences", preferences);
				request.setAttribute("arrayTasks", tasks);
				request.setAttribute("arrayUsers", userTest);
				request.getSession().setAttribute("userInSession", userInSession);

				System.out.println(preferences.toString());

				RequestDispatcher view = request.getRequestDispatcher("seeallmappings.jsp");
				view.forward(request, response);


			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

}