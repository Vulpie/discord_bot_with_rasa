exports.parseMessage = (data) => {
	const response_list = []
	data.forEach((rasa_response) => {
		response_list.push(rasa_response.text)

		if (rasa_response.buttons) {
			console.log(rasa_response.buttons)
			let buttons = rasa_response.buttons
			buttons.forEach((button) => {
				response_list.push(`_> ${button.title}_`)
			})
		}
	})
	return response_list
}
