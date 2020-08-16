import React, { useState, useEffect } from 'react';
import ProgramsLayout from './programsLayout';
import axios from 'axios';

interface ProgramsData extends Array<Program> { }

interface Program {
    id: number | null,
    title: string,
    description: string,
    author: string,
    created_at: string,
    updated_at: string
}

const Programs: React.FunctionComponent = () => {
    /**
     * * Default constructor with no data
     */
    const [programs, setPrograms] = useState<ProgramsData>(
        [
            {
                'id': null,
                'title': '',
                'description': '',
                'author': '',
                'created_at': '',
                'updated_at': ''
            }
        ]
    )

    /**
     *  * On update/change fetches programs data and updates setData state
     */
    useEffect(() => {
        try {
            const fetchPrograms = async (): Promise<void> => {
                const results = await axios({
                    method: 'GET',
                    url: 'http://localhost:1337/registrations',
                })
                setPrograms(results.data);
            }
            fetchPrograms();
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <div className='flex flex-wrap justify-center  w-screen'>
            {programs.map(program => {
                return (
                    <ProgramsLayout>
                        {`checking if this is ${program.title}`}
                    </ProgramsLayout>
                )
            })}
        </div>
    )
}

export default Programs;