import {db} from "../db/db";
import {unwatchFile} from "node:fs";

const dbVideos: DBVideo[] = [
    {
        _id: '1',
        title: 'course DEV',
        authorId: '1'
    },
    {
        _id: '2',
        title: 'course ML',
        authorId: '1'
    }
];

const dbAuthors: DBAuthor[] = [{
    _id: '1',
    firstName: 'Mike',
    lastName: 'Simpson'
}];

const videoQueryRepo = {
    getVideo(): VideoOutputModel[] {
        return dbVideos.map(dbVideo => {
            const author = dbAuthors.find(dbAuthor => dbAuthor._id === dbVideo.authorId);
            return {
                id: dbVideo._id,
                title: dbVideo.title,
                authorId: {
                    id: author!._id,
                    name: author!.firstName + ' ' + author!.lastName
                }
            }
        })
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