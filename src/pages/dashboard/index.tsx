import React, { useRef, useCallback, useState, useEffect } from 'react';
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form} from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

interface TeacherFormData {
    subject: string;
    teacher: string;
    dayOfWeek: Array<String>;
    period: string;
    time: string;

}


const Dashboard: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [teachers, setTeachers] = useState<TeacherFormData[]>([])
    
    useEffect(() => {
        let getData: TeacherFormData = JSON.parse(localStorage.getItem('teacher') || "{}")
        setTeachers([...teachers, getData])
    }, [])
   

    const handleSubmit = useCallback(async (data: TeacherFormData) => {
      
       try {
            formRef.current?.setErrors({});

            const teste = data
            teachers.push(teste)
            
            const schema = Yup.object().shape({
                subject: Yup.string().required('Disciplina Obrigatória'),                    
                teacher: Yup.string().required('Professor Obrigatório'),
                dayOfWeek: Yup.string().required('Dia da semana Obrigatório'),
                period: Yup.string().required('período Obrigatório'),
                time: Yup.string().required('horário Obrigatório'),

            });


            await schema.validate(data, {
                abortEarly: false,
            });

            setTeachers([...teachers, data])

            localStorage.setItem('teacher', JSON.stringify(teachers))

         


        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
            }
        }

        // addToast({
        //     type: 'error',
        //     title: 'Erro na autenticação',
        //     description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        // });

    }, []);

    
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber"/>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Cadastrar Professor</h1>

                    <Input name="subject" icon={FiMail} placeholder="Disciplína"/>
                    <Input name="teacher" icon={FiLock} placeholder="Professor"/>
                    <Input  name="dayOfWeek" icon={FiLock} placeholder="Dia da Semana"/>
                    <Input name="period" icon={FiLock} placeholder="período"/>
                    <Input name="time" icon={FiLock} placeholder="horário"/>
                    <Button type="submit">Cadastrar</Button>

                </Form>

                {teachers.map((data, index) => (<a key={index} onClick={() => {
                    localStorage.setItem('name', data.teacher)
                    window.location.href="/teacher"}}><h1>{data.teacher}</h1></a>))}
 

            </Content>

        </Container>
    );
};

export default Dashboard;