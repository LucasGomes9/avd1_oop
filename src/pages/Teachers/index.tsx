import React, { useRef, useCallback, useEffect, useState } from 'react';
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Background, Container, Content } from './styles';

interface TeacherData {
    subject: string;
    teacher: string;
    dayOfWeek: Array<String>;
    period: string;
    time: string;
}

const SignIn: React.FC = () => {

    const [teacher1, setTeacher] = useState<TeacherData[]>([])
    let arr:TeacherData[] = []

    useEffect(() =>{

        
    let name = localStorage.getItem('name')
    let teacher = localStorage.getItem('teacher')

    if(teacher) {
        const convert:TeacherData[] = JSON.parse(teacher)
        const teacherFilter = convert.filter((f) => f.teacher === name)
        setTeacher(teacherFilter)
        
        console.log(teacherFilter)
    }

    }, [])


    return (
        <Container>
            <Content>               
                <Link to="/dashboard">
                <img src={logoImg} alt="GoBarber"/>
                </Link>

                {teacher1.map((data, index) =>{
                    return(
                        <label style={{marginTop: '60px'}} key={index}>{`Nome: ${data.teacher}, disciplina ${data.subject}, \n dia da semana: ${data.dayOfWeek},
                        periodo: ${data.period}, \n horario: ${data.time}`}</label>
                    )
                })}


            </Content>

        </Container>
    );
};

export default SignIn;