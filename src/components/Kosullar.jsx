// src/components/Kosullar.jsx
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  padding-top: 80px; /* Navbar yüksekliğine bağlı olarak ayarlayın */
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 5%;
  padding-top: 20px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Paragraph = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const KullanımŞartları = () => {
  return (
    <Container>
      <Title>Kullanım Şartları ve Sorumluluk Bildirimi</Title>
      <Paragraph>
        <strong>Kullanıcı Sorumluluğu:</strong> Tespits platformunu kullanarak, tüm kullanıcılar aşağıda belirtilen kurallara ve yasalara uymayı kabul ederler. Kullanıcıların paylaştığı her türlü içerikten tamamen kullanıcılar sorumludur. Tespits, kullanıcıların paylaşımlarından doğabilecek herhangi bir hukuki sorumluluğu kabul etmez.
      </Paragraph>
      <Paragraph>
        <strong>Yasaklı İçerikler:</strong> Tespits'nde aşağıdaki içeriklerin paylaşılması kesinlikle yasaktır:
        <ul>
          <li>Siyaset: Herhangi bir siyasi partiyi, politikacıları veya siyasi görüşleri doğrudan hedef alan veya siyasi propaganda içeren paylaşımlar.</li>
          <li>Şiddet: Her türlü fiziksel veya psikolojik şiddeti teşvik eden, öven veya meşrulaştıran içerikler.</li>
          <li>Tehdit: Herhangi bir bireye veya gruba yönelik tehdit içeren paylaşımlar.</li>
          <li>Nefret Söylemi: Irk, etnik köken, din, cinsiyet, cinsel yönelim, engellilik durumu veya benzeri herhangi bir ayrımcılığı teşvik eden, nefret söylemi içeren paylaşımlar.</li>
          <li>Terör Propagandası: Terör örgütlerini öven, terör faaliyetlerini destekleyen veya teşvik eden paylaşımlar.</li>
          <li>Diğer Hukuka Aykırı İçerikler: Yukarıda belirtilmeyen ancak yerel veya uluslararası hukuk tarafından yasaklanan veya cezai yaptırımı olan içerikler.</li>
        </ul>
      </Paragraph>
      <Paragraph>
        <strong>Paylaşımlar ve Yükümlülükler:</strong> Kullanıcılar, Tespits'nde yaptıkları her paylaşımın yasalara uygun olduğundan emin olmakla yükümlüdür. Paylaşılan içeriklerden dolayı doğabilecek her türlü hukuki, cezai veya mali sorumluluk, içeriği paylaşan kullanıcıya aittir. Tespits, bu tür içeriklerin paylaşımından doğacak hukuki sonuçlardan sorumlu tutulamaz.
      </Paragraph>
      <Paragraph>
        <strong>İçerik Kontrolü ve Kaldırma:</strong> Tespits, kullanıcılar tarafından paylaşılan içerikleri düzenli olarak denetleme ve yukarıda belirtilen kurallara aykırı içerikleri kaldırma hakkını saklı tutar. Bu tür içerikler tespit edildiğinde, ilgili kullanıcı hakkında gerekli hukuki işlemler başlatılabilir ve kullanıcı hesabı süresiz olarak askıya alınabilir.
      </Paragraph>
      <Paragraph>
        <strong>Kullanım Şartlarının İhlali:</strong> Bu kullanım şartlarını ihlal eden kullanıcılar, Tespits tarafından alınacak her türlü önleme ve yaptırıma tabi olmayı kabul ederler. Kullanıcılar, platformda yaptıkları paylaşımlardan dolayı doğabilecek her türlü hukuki işlemde, Tespits'nin zararlarını tazmin etmeyi kabul ederler.
      </Paragraph>
    </Container>
  );
};

export default KullanımŞartları;
