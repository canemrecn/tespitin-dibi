// src/components/Categories.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Categories.css';

const categories = [
  { id: 1, title: 'Aile & Toplum', image: 'kategori1.png' },
  { id: 2, title: 'Alışveriş & Hediyeler', image: 'kategori2.png' },
  { id: 3, title: 'Astroloji & Burçlar', image: 'kategori3.png' },
  { id: 4, title: 'Arabalar', image: 'kategori4.png' },
  { id: 5, title: 'Bebek Bakımı', image: 'kategori5.png' },
  { id: 6, title: 'Aşk İlişkileri', image: 'kategori6.png' },
  { id: 7, title: 'Cilt Bakım', image: 'kategori7.png' },
  { id: 8, title: 'Çocuk & Ebeveyn', image: 'kategori8.png' },
  { id: 9, title: 'Diğer', image: 'kategori9.png' },
  { id: 10, title: 'Diziler & Filmler', image: 'kategori10.png' },
  { id: 11, title: 'Duş Keyfi', image: 'kategori11.png' },
  { id: 12, title: 'Eğitim & Kariyer', image: 'kategori12.png' },
  { id: 13, title: 'Ev & Yaşam', image: 'kategori13.png' },
  { id: 14, title: 'Gamer', image: 'kategori14.png' },
  { id: 15, title: 'Evcil Hayvanlar', image: 'kategori15.png' },
  { id: 16, title: 'İnternet & Teknoloji', image: 'kategori16.png' },
  { id: 17, title: 'Kişilik & Karakter', image: 'kategori17.png' },
  { id: 18, title: 'Kültür & Sanat', image: 'kategori18.png' },
  { id: 19, title: 'Moda & Stil', image: 'kategori19.png' },
  { id: 20, title: 'Müzik & Etkinlik', image: 'kategori20.png' },
  { id: 21, title: 'Fantazi & Zevkler', image: 'kategori21.png' },
  { id: 22, title: 'Sınavlar & Okul', image: 'kategori22.png' },
  { id: 23, title: 'Sosyal Medya', image: 'kategori23.png' },
  { id: 24, title: 'Yapay Zeka', image: 'kategori24.png' },
];

function Categories() {
  return (
    <Container className="categories-container">
      <Row className="categories-row">
        {categories.map((category) => (
          <Col md={3} className="mb-2" key={category.id}>
            <Card className="categories-card">
              <Card.Img variant="top" src={category.image} className="card-image" />
              <Card.Body className="card-body">
                <Card.Title>{category.title}</Card.Title>
                <Link to={`/category/${category.id}`}>
                  <Button variant="primary">Görüşlerini Paylaş</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Categories;

