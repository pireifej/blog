function contact_us_form_open() {
	var contact_us_html = "";
	contact_us_html += "<div id='comments'>\n";
	contact_us_html += "<div class='box' id='respond'>\n";
	contact_us_html += "<div class='buffer'>\n";
	contact_us_html += "<h2>Fill Out The Form</h2>\n";
	contact_us_html += "<form action='' method='post' id='commentform'\n";
	contact_us_html += "<p>\n";
	contact_us_html += "<input type='text' name='author' id='author' value='' size='22' tabindex='1' />\n";
	contact_us_html += "<label for='author'><small>Name (required)</small></label>\n";
	contact_us_html += "</p>\n";
	contact_us_html += "<p>\n";
	contact_us_html += "<input type='text' name='email' id='email' value='' size='22' tabindex='2' />\n";
	contact_us_html += "<label for='email'><small>E-Mail (required)</small></label>\n";
	contact_us_html += "</p>\n";
	contact_us_html += "<p>\n";
	contact_us_html += "<input type='text' name='url' id='url' value='' size='22' tabindex='3' />\n";
	contact_us_html += "<label for='url'><small>Website (optional)</small></label>\n";
	contact_us_html += "</p>\n";
	contact_us_html += "<p>\n";
	contact_us_html += "<textarea name='comment' id='comment' cols='100%' rows='10' tabindex='4'></textarea>\n";
	contact_us_html += "</p>\n";
	contact_us_html += "<p>\n";
	contact_us_html += "<button name='submit' type='submit' id='submit'>Submit Comment</button>\n";
	contact_us_html += "</p>\n";
	contact_us_html += "</form>\n";
	contact_us_html += "</div>\n";
	contact_us_html += "</div>\n";
	contact_us_html += "</div>\n";
	display_new_modal(contact_us_html, "Contact Us");
}

function display_new_modal(modal_content, modal_title) {
	$("#dialog").dialog({
		autoOpen: false,
		show: {
		effect: "fade",
			duration: 250
		},
		hide: {
			effect: "drop",
			duration: 1000
		},
		title: modal_title,
		width: 500
	});
	$("#dialog").html(modal_content);
	$("#dialog").dialog("open");
}

function close_modal() {
	if ($("#dialog").dialog) {
		$("#dialog").dialog("close");
	}
}

function exists(assoc_array, key) {
	return (typeof assoc_array[key] != "undefined" && assoc_array[key] != "");
}

function send_ajax_wrapper(ajax_data, function_ptr) {
	var my_data = send_ajax(ajax_data);
	my_data
		.done(function(data) {
			console.log(ajax_data.file_name + " success");
			if (function_ptr != "") {
				window[function_ptr](data);
			}
		})
		.fail(function(data) {
			console.log(ajax_data.file_name + " failure");
			console.log(data);
			alert("Error - " + data.responseText);
		});
}

function send_ajax(ajax_data) {
	if (!exists(ajax_data, "file_name")) {
		console.log("Error - send_ajax requires file_name!");
		return;
	}
	return $.ajax({
		url: "./" + ajax_data.file_name + ".dat",
		dataType: "json",
		data: ajax_data,
		statusCode: {
			404: function() {
				console.log("404 error code - page not found!\n");
			},
			500: function() {
				console.log("500 error code - time out!\n");
			},
			200: function() {
				console.log("200 error code - response OK!\n");
			}
		}
	});
}

function populate_menu(menu) {
	var list_html = "";
	for (var menu_item in menu) {
		list_html += "<div class='box'>";
		list_html += "<h2>" + menu_item + "</h2>\n";
		list_html += "<ul>";
		var sub_menu = menu[menu_item];
		for (var sub_menu_index in sub_menu) {
			list_html += "<li>" + sub_menu[sub_menu_index] + "</li>";
		}
		list_html += "</ul>";
		list_html += "</div>";
	}
	$("#lsidebar").html(list_html);
}

function populate_article(article) {
	var article_html = "";

	// subject
	article_html += "<div class='box'>\n";
	article_html += "<div class='buffer'>\n";
	article_html += "<h2>" + article.subject + "</h2>\n";
	article_html += "<img src='images/" + article.main_image + "' alt='' />\n";
	article_html += "</div>";
	article_html += "</div>";

	// content
	article_html += "<div class='box'>\n";
	article_html += "<ul class='homelist'>\n";
	article_html += "<li> <img src='images/" + article.blog_image + "' alt='' /></a>\n";
	article_html += "<a class='title'>" + article.subject + "</a>\n";
	article_html += "<p>" + article.content + "</p>\n";
	article_html += "</li>\n";
	article_html += "</ul>\n";
	article_html += "</div>\n";
	
	$("#content").html(article_html);
}

function open_article(article_name) {
	var ajax_data = {
		"file_name" : article_name
	};
	send_ajax_wrapper(ajax_data, "populate_article");
}

$(document).ready(function() {
	var ajax_data = {
		"file_name" : "menu"
	};
	send_ajax_wrapper(ajax_data, "populate_menu");
	open_article("thoughts");
})
