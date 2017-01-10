## Plánování úloh (scheduling)

V některých případech chceme, aby se určitý kód spustil později, případně se opakoval v pravidelných intervalech. Prvním řešením, se kterým začátečníci většinou přijdou, je vytvoření nového vlákna s nekonečnou smyčkou a uspání vlákna v každém cyklu (metodou *sleep()*). Tato implementace však není příliš elegantní.

Ve standardní knihovně se nachází třídy, které jsou přímo určené k řešení zmíněných úloh:

- [ScheduledExecutorService](http://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ScheduledExecutorService.html) - rozhraní plánovače
- [Executors](http://docs.oracle.com/javase/8/docs/api/java/util/concurrent/Executors.html) - tovární třída usnadňující vytváření plánovačů

### Vytvoření plánovače

Prvním krokem je vytvoření plánovače, tedy nějaké implementace rozhraní *ScheduledExecutorService*, která se bude starat o plánování a spouštění úloh pomocí určeného počtu vláken. 

Pokud chceme plánovat pouze jednu úlohu nebo nechceme, aby docházelo k paralelnímu spouštění několika úloh, použijeme tuto tovární metodu, která vytvoří plánovač s pouhým jedním vláknem:

```java
ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
```

Pokud chceme úlohy spouštět i paralelně pomocí většího počtu vláken, zavoláme tuto metodu:

```java
int numThreads = 8;
ScheduledExecutorService executor = Executors.newScheduledThreadPool(numThreads);
```

Pak již nic nebrání plánovat úlohy.

### Jednorázové plánování

Takto naplánujeme výpis "Hello!" jednorázově za deset sekund.

```java
// definice úlohy
Runnable task = () -> System.out.println("Hello!");
// vytvoření plánovače (jedno vlákno)
ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();

// jednorázové naplánování úlohy po 10 sekundách
executor.schedule(task, 10, TimeUnit.SECONDS);

// ukončit příjem nových úloh
executor.shutdown();
// neomezeně dlouho čekat na dokončení všech úloh
executor.awaitTermination(Long.MAX_VALUE, TimeUnit.DAYS);
```

### Pravidelné opakování s pevným intervalem

Opakování s pevným intervalem (*fixed delay*) znamená, že interval mezi dokončením jednoho opakování a začátkem dalšího by měl být stále stejný, a to nezávisle na tom, jak dlouho úloha trvá. Pokud je tedy například interval nastaven na deset sekund a první opakování úlohy trvá dvě sekundy, nebude to mít žádný vliv na délku pauzy před druhým opakováním a ta bude stále deset sekund. Stejně tak se délka pauzy nezmění, bude-li některé z opakování trvat delší dobu, než jeden interval. Teoreticky jsou všechna opakování (kromě prvního) čím dál tím více zpožděná, protože každé opakování zabere nenulový čas.

Takto naplánujeme výpis "Hello!" každou sekundu po dobu jedné minuty:

```java
// vytvoření plánovače (jedno vlákno)
ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
// definice úlohy
Runnable task = () -> System.out.println("Hello!");
// naplánování úlohy: opakovat každou sekundu
executor.scheduleWithFixedDelay(task, 0, 1, TimeUnit.SECONDS);
// čekat 1 minutu a poté proces ukončit
executor.awaitTermination(1, TimeUnit.MINUTES);
executor.shutdown();
```

### Pravidelné opakování s pevnou frekvencí

Opakování s pevnou frekvencí (*fixedRate*) znamená, že interval mezi začátky dvou opakování téže úlohy by měl být stále stejný, a to nezávisle na tom, jak dlouho úloha trvá. Pokud je tedy například interval nastaven na deset sekund a první opakování úlohy trvá dvě sekundy, bude pauza mezi prvním a druhým opakováním trvat osm sekund. Pokud některé z opakování trvá delší dobu, než jeden interval, dojde ke zpoždění všech následujících úloh.

Takto naplánujeme výpis "Hello!" každou sekundu po dobu jedné minuty:

```java
// vytvoření plánovače (jedno vlákno)
ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
// definice úlohy
Runnable task = () -> System.out.println("Hello!");
// naplánování úlohy: opakovat každou sekundu
executor.scheduleAtFixedRate(task, 0, 1, TimeUnit.SECONDS);
// čekat 1 minutu a poté proces ukončit
executor.awaitTermination(1, TimeUnit.MINUTES);
executor.shutdown();
```

### Zrušení úlohy

Každé zavolání plánovací metody (např. *schedule*) vrací instanci rozhraní *ScheduledFuture*, kterou lze použít pro práci s danou úlohou, tedy i pro její zrušení. Následující příklad ukazuje, jak určitou úlohu ukončit jinou úlohou po uplynutí zadané doby:

```java
// vytvoření plánovače (jedno vlákno)
ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
// definice úlohy
Runnable tickTask = () -> System.out.println("Tick");
// naplánování úlohy: opakovat každou sekundu
ScheduledFuture<?> scheduledTickTask = executor.scheduleAtFixedRate(tickTask, 0, 1, TimeUnit.SECONDS);
// definice úlohy
Runnable cancelTask = () -> {
    // zrušit naplánovanou úlohu
    scheduledTickTask.cancel(false);
    // ukončit příjem nových úloh
    executor.shutdown();
};
// naplánování úlohy: spustit za 5 sekund
executor.schedule(cancelTask, 5, TimeUnit.SECONDS);
// neomezeně dlouho čekat na dokončení všech úloh
executor.awaitTermination(Long.MAX_VALUE, TimeUnit.DAYS);
```

Trochu detailnější studium vyžadují metody *awaitTermination* a *shutdown*. Stručně řečeno: *shutdown* způsobí, že plánovač přestane přijímat nové úlohy, což znamená i to, že pravidelně opakované úlohy přestanou plánovat své další iterace. Metoda *awaitTermination* pro změnu zablokuje volající vlákno až do doby, než všechny úlohy skončí nebo dojde k vypršení zadaného časového limitu (podle toho, co nastane dřív). V případě, že vyprší časový limit, dojde sice k odblokování volajícího vlákna, ale na existující úlohy to nemá žádný vliv. V případě, že jsou naplánovány nějaké opakující se úlohy, volání *awaitTermination* vždy skončí vypršením časového limitu, protože opakující se úlohy za normálních podmínek nikdy neskončí.

### Pokročilé frameworky

Plánování úloh je podporováno i ve frameworku [Spring](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/scheduling.html), který podporuje i [CRON výrazy](wiki/cron). Pro ještě náročnější použití například v klastru lze použít [Quartz Job Scheduler](http://quartz-scheduler.org/).