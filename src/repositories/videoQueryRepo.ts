const dbVideos: DBVideo[] = [
    {
        _id: '1',
        title: 'course DEV',
        authorId: '1'
    },
    {
        _id: '2',
        title: 'course ML',
        authorId: '2'
    }
];

const dbAuthors: DBAuthor[] = [
    {
        _id: '1',
        firstName: 'Mike',
        lastName: 'Simpson'
    },
    {
        _id: '2',
        firstName: 'John',
        lastName: 'Connor'
    }
];

const videoQueryRepo = {
    getVideo(): VideoOutputModel[] {
        return dbVideos.map(dbVideo => {
            const author = dbAuthors.find(dbAuthor => dbAuthor._id === dbVideo.authorId);

            // return {
            //     id: dbVideo._id,
            //     title: dbVideo.title,
            //     authorId: {
            //         id: author!._id,
            //         name: author!.firstName + ' ' + author!.lastName
            //     }
            // }

            return this._mapDBVideoToVideoOutputModel(dbVideo, author!);
        })
    },

    getVideoById(id: string): VideoOutputModel | undefined {
        const foundVideo: DBVideo | undefined = dbVideos.find(dbVideo => dbVideo._id === id);
        const foundAuthor: DBAuthor | undefined = dbAuthors.find(dbAuthor => dbAuthor._id === foundVideo!.authorId);

        // return {
        //     id: foundVideo!._id,
        //     title: foundVideo!.title,
        //     authorId: {
        //         id: foundAuthor!._id,
        //         name: foundAuthor!.firstName + ' ' + foundAuthor!.lastName
        //     }
        // }

        return this._mapDBVideoToVideoOutputModel(foundVideo!, foundAuthor!);
    },

    _mapDBVideoToVideoOutputModel(dbVideo: DBVideo, dbAuthor: DBAuthor) {
        return {
            id: dbVideo!._id,
            title: dbVideo!.title,
            authorId: {
                id: dbAuthor!._id,
                name: dbAuthor!.firstName + ' ' + dbAuthor!.lastName
            }
        }
    }
}

type DBVideo = {
    _id: string,
    title: string,
    authorId: string,
}

type DBAuthor = {
    _id: string,
    firstName: string,
    lastName: string
}

type VideoOutputModel = {
    id: string,
    title: string,
    authorId: {
        id: string,
        name: string
    }
}