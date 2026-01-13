import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  discount?: number;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const products: Product[] = [
    { id: 1, name: 'Крем для лица с коллагеном', category: 'Уход за лицом', price: 2890, image: 'https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/d199a5f5-ceb6-4fd5-b1c7-503142eb3b25.jpg' },
    { id: 2, name: 'Увлажняющая сыворотка', category: 'Уход за лицом', price: 3490, image: 'https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/33a82ae7-7d12-45fc-8e73-91873d28b0d2.jpg', discount: 20 },
    { id: 3, name: 'Очищающая пенка', category: 'Уход за лицом', price: 1590, image: 'https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/d199a5f5-ceb6-4fd5-b1c7-503142eb3b25.jpg' },
    { id: 4, name: 'Тональный крем SPF50', category: 'Макияж', price: 2190, image: 'https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/33a82ae7-7d12-45fc-8e73-91873d28b0d2.jpg', discount: 15 },
    { id: 5, name: 'Питательный крем для тела', category: 'Уход за телом', price: 1890, image: 'https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/d199a5f5-ceb6-4fd5-b1c7-503142eb3b25.jpg' },
    { id: 6, name: 'Антивозрастная маска', category: 'Уход за лицом', price: 4290, image: 'https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/33a82ae7-7d12-45fc-8e73-91873d28b0d2.jpg' },
  ];

  const reviews = [
    { id: 1, name: 'Анна Петрова', rating: 5, text: 'Потрясающая косметика! Кожа стала заметно лучше после первой недели использования.', avatar: '👩' },
    { id: 2, name: 'Мария Иванова', rating: 5, text: 'Отличное качество продукции. Рекомендую всем!', avatar: '👱‍♀️' },
    { id: 3, name: 'Елена Сидорова', rating: 4, text: 'Хороший результат, приятная текстура. Буду заказывать ещё.', avatar: '👩‍🦰' },
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => {
    const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
    return sum + price * item.quantity;
  }, 0);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-3xl">✨</div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Атоми
              </h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              {[
                { id: 'home', label: 'Главная', icon: 'Home' },
                { id: 'catalog', label: 'Каталог', icon: 'ShoppingBag' },
                { id: 'about', label: 'О компании', icon: 'Info' },
                { id: 'promo', label: 'Акции', icon: 'Sparkles' },
                { id: 'reviews', label: 'Отзывы', icon: 'Star' },
                { id: 'contact', label: 'Контакты', icon: 'Phone' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary font-semibold' : 'text-gray-600'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Icon name="ShoppingBag" size={24} />
                    Корзина
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex gap-3">
                              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm">{item.name}</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {item.discount ? (
                                    <>
                                      <span className="line-through mr-2">{item.price} ₽</span>
                                      <span className="text-primary font-semibold">
                                        {Math.round(item.price * (1 - item.discount / 100))} ₽
                                      </span>
                                    </>
                                  ) : (
                                    <span>{item.price} ₽</span>
                                  )}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="h-7 w-7 p-0"
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="text-sm font-semibold">{item.quantity}</span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="h-7 w-7 p-0"
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-auto text-destructive"
                                  >
                                    <Icon name="Trash2" size={16} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-semibold">Итого:</span>
                          <span className="text-2xl font-bold text-primary">
                            {Math.round(cartTotal)} ₽
                          </span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <section id="home" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-gradient-to-r from-pink-500 to-purple-600">
                Южно-Корейская косметика премиум класса
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Красота и здоровье
                <span className="block bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  в каждом продукте
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Откройте для себя мир инновационной косметики Атоми. Продукция мирового класса для вашей красоты и здоровья.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                  <Icon name="ShoppingBag" size={20} className="mr-2" />
                  Каталог продукции
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')}>
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Онлайн консультация
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
              <img
                src="https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/4270454c-acc3-4a80-88a5-c86a0b454d7e.jpg"
                alt="Beauty"
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">Каталог</Badge>
            <h2 className="text-4xl font-bold mb-4">Наша продукция</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Широкий ассортимент косметических средств для ухода за кожей и красоты
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                  {product.discount && (
                    <Badge className="absolute top-4 right-4 bg-red-500">-{product.discount}%</Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                  <h3 className="font-semibold text-lg mb-3">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      {product.discount ? (
                        <>
                          <span className="text-sm text-muted-foreground line-through mr-2">
                            {product.price} ₽
                          </span>
                          <span className="text-xl font-bold text-primary">
                            {Math.round(product.price * (1 - product.discount / 100))} ₽
                          </span>
                        </>
                      ) : (
                        <span className="text-xl font-bold">{product.price} ₽</span>
                      )}
                    </div>
                    <Button onClick={() => addToCart(product)} size="sm">
                      <Icon name="ShoppingCart" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">О компании</Badge>
              <h2 className="text-4xl font-bold mb-6">Атоми - качество мирового класса</h2>
              <p className="text-muted-foreground mb-6">
                Атоми - южно-корейская компания, специализирующаяся на производстве высококачественной косметики и товаров для здоровья. 
                Мы используем передовые технологии и натуральные ингредиенты для создания продукции мирового уровня.
              </p>
              <div className="space-y-4">
                {[
                  { icon: 'Award', title: 'Премиум качество', desc: 'Сертифицированная продукция международного стандарта' },
                  { icon: 'Leaf', title: 'Натуральные ингредиенты', desc: 'Только проверенные и безопасные компоненты' },
                  { icon: 'Globe', title: 'Мировое признание', desc: 'Присутствие в 30+ странах мира' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-xl">
                      <Icon name={item.icon} size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/33a82ae7-7d12-45fc-8e73-91873d28b0d2.jpg"
                alt="Products"
                className="rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="promo" className="py-20 px-4 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <Icon name="Sparkles" size={48} className="mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Специальные предложения</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Успейте приобрести продукцию со скидкой до 20%! Акция действует ограниченное время.
          </p>
          <Button size="lg" variant="secondary" onClick={() => scrollToSection('catalog')}>
            Посмотреть акции
          </Button>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">Отзывы</Badge>
            <h2 className="text-4xl font-bold mb-4">Что говорят наши клиенты</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map(review => (
              <Card key={review.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">{review.avatar}</div>
                    <div>
                      <h4 className="font-semibold">{review.name}</h4>
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Icon key={i} name="Star" size={14} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="mb-4">Контакты</Badge>
            <h2 className="text-4xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-muted-foreground">
              Получите бесплатную консультацию от наших специалистов
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="MessageCircle" size={24} className="text-primary" />
                  Онлайн консультация
                </h3>
                <p className="text-muted-foreground mb-6">
                  Наши косметологи и визажисты готовы ответить на ваши вопросы и помочь подобрать идеальные средства для вашей кожи.
                </p>
                <form className="space-y-4">
                  <Input placeholder="Ваше имя" />
                  <Input type="email" placeholder="Email" />
                  <Input type="tel" placeholder="Телефон" />
                  <Textarea placeholder="Опишите ваш запрос" rows={4} />
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600">
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Phone" size={20} className="text-primary" />
                    Телефон
                  </h4>
                  <p className="text-muted-foreground">+7 (800) 555-35-35</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Mail" size={20} className="text-primary" />
                    Email
                  </h4>
                  <p className="text-muted-foreground">info@atomy-russia.ru</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Clock" size={20} className="text-primary" />
                    Режим работы
                  </h4>
                  <p className="text-muted-foreground">Пн-Пт: 9:00 - 20:00<br />Сб-Вс: 10:00 - 18:00</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="text-3xl">✨</div>
            <h3 className="text-2xl font-bold">Атоми</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Южно-Корейская косметика премиум класса
          </p>
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="hover:text-primary transition-colors">
              <Icon name="Instagram" size={24} />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <Icon name="Facebook" size={24} />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <Icon name="Youtube" size={24} />
            </a>
          </div>
          <p className="text-sm text-gray-500">
            © 2024 Атоми. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
