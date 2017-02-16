(function() {
	"use strict";

	$(document).ready(() => {
		const TodoModule = function() {
			let numberActive = 0;
			let inputValues = [];
			let idNumber = 0;
			let counterSpace = document.querySelector('.incomplete-items');
			////////////////////////////////////////////
			// Work Flow ::::
			// iifee ---> jq/ready ---> constr ---> init()
			// init() --> bindEvents()
			// init() --> generateTemplate(input)
			//
			////////////////////////////////////////////

			////////////////////////////////////////////
			// FUNCTION : Remove Completed
			////////////////////////////////////////////
			function clearBtn() {
				$('.clear').on('click', function() {
					event.preventDefault();
					$('.items li.completed').remove();
				});
			}

			////////////////////////////////////////////
			// FUNCTION : All button
			////////////////////////////////////////////
			function allBtn() {
				$('.show-all').on('click', function() {
					event.preventDefault();
					$('.items li').removeClass('hide');
				});
			}

			////////////////////////////////////////////
			// FUNCTION : COMPLETED Button
			////////////////////////////////////////////
			function completedBtn() {
				$('.show-completed').on('click', function() {
					event.preventDefault();
					$('.items li').addClass('hide');
					$('.items li.completed').removeClass('hide');
				});
			}

			////////////////////////////////////////////
			// FUNCTION : Show all Active button
			////////////////////////////////////////////
			function showActive() {
				$('.show-active').on('click', function() {
					event.preventDefault();
					$('.items li').removeClass('hide'); // reset
					$('.items li.completed').addClass('hide');

					$(this).css({
						"-webkit-animation-name": "rotatebutton",
						"-webkit-animation-duration": "2s",
						"-webkit-animation-iteration-count": "1",
						"-webkit-animation-fill-mode": "forwards"
					});

				});
			}

			////////////////////////////////////////////
			// FUNCTION : COUNTER
			////////////////////////////////////////////

			function counterMan() {
				numberActive = $('.items li').not('.completed');
				counterSpace.innerHTML = numberActive.length;
			}

			////////////////////////////////////////////
			// FUNCTION : COMPLETED
			////////////////////////////////////////////
			function completedActive() {
				$('.items').on('click', '.check', function() {
					event.preventDefault();
					$(this).parents('li').addClass('completed');
					counterMan(); // keep count accurate // dom cleaner
				});
			}

			////////////////////////////////////////////
			// FUNCTION : REMOVE THINGS // fully remove li // keep dom clean
			////////////////////////////////////////////
			function removeThings() {
				$('.items').on('click', '.delete', function() {
					event.preventDefault();
					$(this).parents('li').css("background-color", "red").fadeOut(1000, function() {
						$(this).parents('li').remove();
						counterMan(); // keep count accurate

					});
					counterMan(); // keep count accurate
				});
			}

			////////////////////////////////////////////
			// FUNCTION : EDIT TO DO INLINE
			////////////////////////////////////////////
			function changeMind() {
				$('.items').on('click', 'p', function() {
					// console.log('changemind');
					$(this).attr('contenteditable', true);
					// $(this).parents('li').addClass('editing'); ?? not sure what the 'editing' class was for?
				});
			}

			////////////////////////////////////////////
			// FUNCTION : BIND EVENTS
			////////////////////////////////////////////
			function bindEvents() {
				$('form').on('submit', function() {
					event.preventDefault();
					let newTodoInput = {}; // new object to pass name/id values
					newTodoInput.name = $('.new-todo').val(); // obj
					newTodoInput.id = idNumber++;
					console.log(newTodoInput);
					console.log(inputValues);

					inputValues.push(newTodoInput);

					// pass object key:name to generateTemplate()
					generateTemplate(newTodoInput.name);
					changeMind(); // edit todo p tag
					removeThings(); // delete li
					completedActive(); // green check
					counterMan(); // counter on active li
					showActive(); // only show active li
					completedBtn(); // only show completed li
					allBtn(); // show all li btn
					clearBtn(); // clear completed li
					$('form').trigger("reset"); // clear form

				});
			}
			////////////////////////////////////////////
			// FUNCTION : GENERATE TEMPLATE
			////////////////////////////////////////////
			function generateTemplate(input) {
				console.log('input ' + input);
				// grab HTML from template as a string
				const source = $(`#todo-template`).html();
				// console.log('source ' + source);

				//convert the html string into a hb function
				const template = Handlebars.compile(source);
				// console.log('template' + template);

				// empty obj because no dynamic info on home-template
				// use context when passing custom details to each template
				const context = {
					newTodoInput: input
				};
				// console.dir('context ' + context);

				// pass context into the template func created above
				const html = template(context);
				// console.log('html' + html);
				// prepend to the UL tag
				$('.items').prepend(html);
				$('.items li').removeClass('hide');

				// $('.items li').attr('data-active', 'true');
			}


			////////////////////////////////////////////
			// FUNCTION : INIT
			////////////////////////////////////////////
			function init() {
				bindEvents();

			} // end init

			return {
				init: init
			}; // end return
		}; // TodoModule end module
		const todoApp = TodoModule();
		todoApp.init();
	}); // end jq ready
})(); // end iife // nothing should be below this line
