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
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products: Product[] = [
    { 
      id: 1, 
      name: 'Абсолют Селлюлар Актив Крем', 
      category: 'skincare', 
      price: 4890, 
      image: 'https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/b3d74874-b882-4d05-8738-2afd3f2b05fe.jpg',
      description: 'Антивозрастной крем с стволовыми клетками'
    },
    { 
      id: 2, 
      name: 'Абсолют Селлюлар Актив Сыворотка', 
      category: 'skincare', 
      price: 5290, 
      image: 'https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/b3d74874-b882-4d05-8738-2afd3f2b05fe.jpg',
      discount: 15,
      description: 'Интенсивная восстанавливающая сыворотка'
    },
    { 
      id: 3, 
      name: 'Абсолют Селлюлар Актив Эссенция', 
      category: 'skincare', 
      price: 3890, 
      image: 'https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/b3d74874-b882-4d05-8738-2afd3f2b05fe.jpg',
      description: 'Питательная эссенция для лица'
    },
    { 
      id: 4, 
      name: 'Абсолют Селлюлар Актив Тоник', 
      category: 'skincare', 
      price: 2490, 
      image: 'https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/b3d74874-b882-4d05-8738-2afd3f2b05fe.jpg',
      description: 'Увлажняющий тоник'
    },
    { 
      id: 5, 
      name: 'Зубная паста Атоми', 
      category: 'oral', 
      price: 890, 
      image: 'https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/f68fe83f-b40d-460d-a6c5-245ca6a9a97a.jpg',
      description: 'Отбеливающая зубная паста с прополисом'
    },
    { 
      id: 6, 
      name: 'Омега-3', 
      category: 'supplements', 
      price: 2390, 
      image: 'https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/42a55dd0-62d9-4eed-83c5-719f1b980372.jpg',
      description: 'Рыбий жир высокой концентрации'
    },
    { 
      id: 7, 
      name: 'Витамин C', 
      category: 'supplements', 
      price: 1890, 
      image: 'https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/42a55dd0-62d9-4eed-83c5-719f1b980372.jpg',
      discount: 10,
      description: 'Витамин C для иммунитета'
    },
    { 
      id: 8, 
      name: 'Пробиотики', 
      category: 'supplements', 
      price: 2690, 
      image: 'https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/42a55dd0-62d9-4eed-83c5-719f1b980372.jpg',
      description: '10 миллиардов полезных бактерий'
    },
    { 
      id: 9, 
      name: 'Шампунь для волос', 
      category: 'haircare', 
      price: 1590, 
      image: 'https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/b3d74874-b882-4d05-8738-2afd3f2b05fe.jpg',
      description: 'Укрепляющий шампунь с травами'
    },
    { 
      id: 10, 
      name: 'Кондиционер для волос', 
      category: 'haircare', 
      price: 1590, 
      image: 'https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/b3d74874-b882-4d05-8738-2afd3f2b05fe.jpg',
      description: 'Питательный кондиционер'
    },
    { 
      id: 11, 
      name: 'BB крем SPF 30', 
      category: 'makeup', 
      price: 1990, 
      image: 'https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/b3d74874-b882-4d05-8738-2afd3f2b05fe.jpg',
      description: 'Тональный BB крем с защитой от солнца'
    },
    { 
      id: 12, 
      name: 'Помада Color Lip', 
      category: 'makeup', 
      price: 1290, 
      image: 'https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/b3d74874-b882-4d05-8738-2afd3f2b05fe.jpg',
      discount: 20,
      description: 'Стойкая увлажняющая помада'
    },
  ];

  const categories = [
    { id: 'all', name: 'Все товары', icon: 'Grid3x3' },
    { id: 'skincare', name: 'Уход за лицом', icon: 'Sparkles' },
    { id: 'supplements', name: 'БАДы и витамины', icon: 'Heart' },
    { id: 'haircare', name: 'Уход за волосами', icon: 'Waves' },
    { id: 'oral', name: 'Гигиена', icon: 'Smile' },
    { id: 'makeup', name: 'Макияж', icon: 'Palette' },
  ];

  const reviews = [
    { id: 1, name: 'Елена Смирнова', rating: 5, text: 'Абсолют крем просто волшебный! Кожа стала упругой и сияющей. Заказываю уже третью баночку.', avatar: '👩' },
    { id: 2, name: 'Ольга Петрова', rating: 5, text: 'Зубная паста супер! Зубы стали белее, десны здоровее. Вся семья перешла на Атоми.', avatar: '👱‍♀️' },
    { id: 3, name: 'Анна Иванова', rating: 5, text: 'Пробиотики помогли наладить пищеварение. Чувствую себя намного лучше!', avatar: '👩‍🦰' },
    { id: 4, name: 'Мария Соколова', rating: 5, text: 'Качество продукции на высоте! Особенно понравилась сыворотка - результат виден сразу.', avatar: '🧑‍🦱' },
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

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

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
              <SheetContent className="w-full sm:max-w-md overflow-y-auto">
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
                      <div className="border-t pt-4 sticky bottom-0 bg-white">
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
                Официальный дистрибьютор Атоми в России
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Продукция Атоми
                <span className="block bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  премиум качества
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Южно-корейская косметика и товары для здоровья мирового класса. Инновационные технологии для вашей красоты и долголетия.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700" onClick={() => scrollToSection('catalog')}>
                  <Icon name="ShoppingBag" size={20} className="mr-2" />
                  Смотреть каталог
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')}>
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Консультация
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
              <img
                src="https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/b3d74874-b882-4d05-8738-2afd3f2b05fe.jpg"
                alt="Atomy Products"
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">Каталог продукции</Badge>
            <h2 className="text-4xl font-bold mb-4">Наши товары</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Широкий ассортимент продукции Атоми для красоты, здоровья и дома
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat.id)}
                className="gap-2"
              >
                <Icon name={cat.icon} size={18} />
                {cat.name}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
                  {product.discount && (
                    <Badge className="absolute top-4 right-4 bg-red-500">-{product.discount}%</Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-base mb-2">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      {product.discount ? (
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground line-through">
                            {product.price} ₽
                          </span>
                          <span className="text-lg font-bold text-primary">
                            {Math.round(product.price * (1 - product.discount / 100))} ₽
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold">{product.price} ₽</span>
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
              <Badge className="mb-4">О компании Атоми</Badge>
              <h2 className="text-4xl font-bold mb-6">Качество мирового уровня</h2>
              <p className="text-muted-foreground mb-6">
                Атоми (Atomy) - южно-корейская компания, основанная в 2009 году. Специализируется на производстве высококачественной косметики, средств для здоровья и товаров для дома. Философия компании - "Абсолютное качество по абсолютной цене".
              </p>
              <div className="space-y-4">
                {[
                  { icon: 'Award', title: 'Сертифицировано', desc: 'Международные сертификаты качества ISO, GMP' },
                  { icon: 'Leaf', title: 'Натуральный состав', desc: 'Только проверенные ингредиенты без вредных добавок' },
                  { icon: 'Globe', title: 'Мировой бренд', desc: 'Представлены в 30+ странах на 6 континентах' },
                  { icon: 'Users', title: 'Миллионы клиентов', desc: 'Более 15 миллионов довольных покупателей' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-xl shrink-0">
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
                src="https://cdn.poehali.dev/projects/2318247a-37a8-411c-afd0-21074f690ecf/files/42a55dd0-62d9-4eed-83c5-719f1b980372.jpg"
                alt="Atomy Products"
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
            Скидки до 20% на избранные товары! Абсолют Селлюлар Актив Сыворотка, Помада Color Lip и Витамин C по специальным ценам.
          </p>
          <Button size="lg" variant="secondary" onClick={() => scrollToSection('catalog')}>
            Смотреть акции
          </Button>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">Отзывы клиентов</Badge>
            <h2 className="text-4xl font-bold mb-4">Что говорят наши покупатели</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map(review => (
              <Card key={review.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">{review.avatar}</div>
                    <div>
                      <h4 className="font-semibold text-sm">{review.name}</h4>
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Icon key={i} name="Star" size={14} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.text}</p>
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
              Бесплатная консультация по подбору продукции и регистрации
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
                  Наши консультанты помогут подобрать продукцию, расскажут о программе лояльности и возможностях сотрудничества с Атоми.
                </p>
                <form className="space-y-4">
                  <Input placeholder="Ваше имя" />
                  <Input type="email" placeholder="Email" />
                  <Input type="tel" placeholder="Телефон" />
                  <Textarea placeholder="Ваш вопрос" rows={4} />
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
                  <p className="text-muted-foreground">+7 (800) 100-80-90</p>
                  <p className="text-sm text-muted-foreground mt-1">Звонок по России бесплатный</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Mail" size={20} className="text-primary" />
                    Email
                  </h4>
                  <p className="text-muted-foreground">info@atomy-russia.com</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Clock" size={20} className="text-primary" />
                    Режим работы
                  </h4>
                  <p className="text-muted-foreground">Пн-Пт: 9:00 - 21:00<br />Сб-Вс: 10:00 - 18:00</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-3xl">✨</div>
                <h3 className="text-2xl font-bold">Атоми</h3>
              </div>
              <p className="text-gray-400">
                Южно-корейская продукция премиум качества для красоты и здоровья
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Популярные категории</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Абсолют Селлюлар Актив</li>
                <li>БАДы и витамины</li>
                <li>Уход за волосами</li>
                <li>Декоративная косметика</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-primary transition-colors">
                  <Icon name="Instagram" size={24} />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Icon name="MessageCircle" size={24} />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Icon name="Youtube" size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>© 2024 Atomy Russia. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
