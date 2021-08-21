import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyle';
import { StudentContainer, ProfilePicture } from './styled';
import axios from '../../services/axios';

function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await axios.get('/students');
      setStudents(res.data);
    }

    getData();
  }, []);

  return (
    <Container>
      <h1>Students</h1>
      <StudentContainer>
        {students.map(student => {
          const hasPhoto = !!student.Files[0];
          return (
            <div key={student.id}>
              <ProfilePicture>
                {hasPhoto ? (
                  <img src={`${student.Files[0].url}`} alt='' />
                ) : (
                  <FaUserCircle size={36} />
                )}
              </ProfilePicture>

              <span>{student.name}</span>
              <span>{student.email}</span>

              <Link to={`/student/${student.id}/edit`}>
                <FaEdit size={16} />
              </Link>

              <Link to={`/student/${student.id}/edit`}>
                <FaWindowClose size={16} />
              </Link>
            </div>
          );
        })}
      </StudentContainer>
    </Container>
  );
}

export default Students;
