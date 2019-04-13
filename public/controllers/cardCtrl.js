// Creates a new card from the given parametres
createNewCard: (type, title, text, resourceURL, authorEmail) => {
    switch (type) {
        case 'text':
            return {
                "mediaType": type,
                "title": title,
                "text": text,
                "author": authorEmail
            }
            break
        default:
            return {
                "mediaType": type,
                "title": title,
                "text": text,
                "resourceURL": resourceURL,
                "author": authorEmail
            }
            break
    }
}