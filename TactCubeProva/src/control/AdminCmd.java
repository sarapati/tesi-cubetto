package control;

import java.io.IOException;



import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Questa servlet gestisce la gestione del carrello,
 * in particolare la visualizzazione di esso, l'aggiunta di un prodotto,
 * l'eliminazione di un prodotto e la modifica della quantità di un prodotto.
 * Viene richiamata dalle JSP: ProdottoSingolo.jsp e index.jsp
 *  
 */
@WebServlet("/adminCmd")
public class AdminCmd extends HttpServlet {
	private static final long serialVersionUID = 1L;

//	static ProdottoModel prodottoModel = new ProdottoModelDS();
	//static ImmagineModel immagineModel = new ImmagineModelDS();
	//static ComposizioneModel composizioneModel = new ComposizioneModelDS();

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

}
