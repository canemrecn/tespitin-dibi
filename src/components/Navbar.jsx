import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import './Navbar.css';

function NavScrollExample() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const categories = [
    { id: 1, title: 'Aile & Toplum' },
    { id: 2, title: 'Alışveriş & Hediyeler' },
    { id: 3, title: 'Astroloji & Burçlar' },
    { id: 4, title: 'Arabalar' },
    { id: 5, title: 'Bebek Bakımı' },
    { id: 6, title: 'Aşk İlişkileri' },
    { id: 7, title: 'Cilt Bakım' },
    { id: 8, title: 'Çocuk & Ebeveyn' },
    { id: 9, title: 'Diğer' },
    { id: 10, title: 'Diziler & Filmler' },
    { id: 11, title: 'Duş Keyfi' },
    { id: 12, title: 'Eğitim & Kariyer' },
    { id: 13, title: 'Ev & Yaşam' },
    { id: 14, title: 'Gamer' },
    { id: 15, title: 'Evcil Hayvanlar' },
    { id: 16, title: 'İnternet & Teknoloji' },
    { id: 17, title: 'Kişilik & Karakter' },
    { id: 18, title: 'Kültür & Sanat' },
    { id: 19, title: 'Moda & Stil' },
    { id: 20, title: 'Müzik & Etkinlik' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const category = categories.find(cat => cat.title.toLowerCase() === searchQuery.toLowerCase());
    if (category) {
      navigate(`/category/${category.id}`);
    } else {
      alert('Kategori bulunamadı');
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = categories.filter(cat => cat.title.toLowerCase().includes(query.toLowerCase()));
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories([]);
    }
  };

  const handleCategoryClick = (category) => {
    setSearchQuery(category.title);
    setFilteredCategories([]);
    navigate(`/category/${category.id}`);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const iconStyle = {
    width: '20px',
    height: '20px',
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar fixed-top">
      <Container fluid>
        <Navbar.Brand href="/"><img src="/logo8.jpg" alt="" className="logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/">Keşfet</Nav.Link>
            <Nav.Link href="/category">Kategoriler</Nav.Link>
            <Nav.Link href="/kullanım-kosullari">Kullanım Koşulları</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearchSubmit}>
              <Form.Control
                type="search"
                placeholder="Kategori Ara"
                className="me-1 search-input"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ width: '300px' }} // Genişliği burada ayarlayın
              />
              <Button variant="outline-success" type="submit">Ara</Button>
            </Form>
          <div className="d-flex ml-auto align-items-center">
            {!user && (
              <Button variant="outline-primary" onClick={handleLoginClick} className="me-2">
                <img src="/login1.png" alt="" style={iconStyle} />
              </Button>
            )}
            {filteredCategories.length > 0 && (
              <ListGroup className="autocomplete-suggestions">
                {filteredCategories.map(category => (
                  <ListGroup.Item
                    key={category.id}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category.title}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
            {!user && (
              <Button variant="outline-primary" onClick={handleRegisterClick} className="ms-2">
                <img src="/add-user.png" alt="" style={iconStyle} />
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
