## Spojový seznam (linked list)

Většina programovacích jazyků nabízí možnost, jak získat referenci či adresu nějakého objektu a tuto adresu v programu používat a předávat jako běžný datový typ, například celé číslo. Tento referenční datový typ zde budeme nazýva třeba **ukazatel** (někde se také můžete setkat s označením reference, odkaz, adresa, atd.). Ukazatel lze dále rozšířit tak, že umožníme, aby mohl nabývat i speciální hodnoty *NULL* (prázdno), která indikuje, že tato reference na žádný objekt neukazuje.

Spojové seznamy jsou dynamické datové struktury, které se skládají z lineárně uspořádaných prvků vzájemně propojených ukazateli. Každý prvek v sobě nese **datovou hodnotu** (například číslo, znak, datovou strukturu nebo objekt) a **ukazatel** na následující prvek (*next*), přičemž poslední prvek ukazuje do prázdna (na hodnotu *NULL*). 

Prvek spojového seznamu tedy "obaluje" datovou hodnotu informacemi o jejím relativním umístění vůči ostatním prvkům a bez datové hodnoty by asi nemělo vůbec smysl nějaký seznam dělat. Při práci se strukturou seznamu (přidávání a odebírání prvků) se však datovými hodnotami nemusíme vůbec zabývat.

Vstupním bodem do spojového seznamu je ukazatel na jeho první prvek, který se také nazývá **hlavička** (*head*). Prázdný spojový seznam poznáme tak, že do prázdna ukazuje už přímo jeho hlavička.

Za cenu další obsazené paměti a složitějších operací lze jednoduché spojové seznamy ještě vylepšit a umožnit tak efektivnější běh algoritmům, které s nimi pracuji. Nejčastější modifikace jsou tyto:

- Pro snadné přidávání prvků na konec seznamu je vhodné zavést ukazatel na konec seznamu, tzv. **patičku** (*tail*).
- Pro efektivní obousměrný průchod lze prvky zřetězit i zpětně, takže kromě ukazatele na následující prvek (*next*) bude každý prvek ukazovat i na prvek předchozí (*prev*).

Podle počtu zřetězení lze odlišit **jednosměrně zřetězené spojové seznamy** a **obousměrně zřetězené spojové seznamy**. Odkaz na patičku se téměř vždy vyplatí, protože se do seznamů často přidává.

```dot:digraph
node [shape=rectangle]
nodesep=0.5
head -> "item 1" [label=" head"]
tail -> "item 3" [label=" tail"]
head [shape=none,label="",style=invisible]
tail [shape=none,label="",style=invisible]
null [shape=none,fillcolor=transparent]
"item 1" -> "item 2" -> "item 3" -> null [label=" next"]
{rank=same;head;tail;}
{rank=same;"item 1";"item 2";"item 3";null}
```

```dot:digraph
node [shape=rectangle]
nodesep=0.6
head -> "item 1" [label=" head"]
tail -> "item 3" [label=" tail"]
head [shape=none,label="",style=invisible]
tail [shape=none,label="",style=invisible]
null1 [shape=plaintext,label="null",fillcolor=transparent]
null2 [shape=plaintext,label="null",fillcolor=transparent]
"item 1" -> "item 2" -> "item 3" -> null1 [label=" next"]
"item 3" -> "item 2" -> "item 1" -> null2 [label=" prev"]
{rank=same;head;tail;}
{rank=same;null1;null2;}
{rank=same;"item 1";"item 2";"item 3";}
```

Pokud poslední prvek seznamu neukazuje do prázdna, ale je napojený opět na začátek seznamu, jedná se o tzv. **cyklicky zřetězený spojový seznam**.

### Asymptotická složitost

| typ seznamu | jednosměrně zřetězený | obousměrně zřetězený |
|---
| přidání prvku | € O(1) € | € O(1) € |
| mazání prvku | € O(1) € | € O(1) € |
| indexace (náhodný přístup k prvku č. *i*) | € O(n) € | € O(n) € |
| vyhledávání | € O(n) € | € O(n) € |

### Výhody a nevýhody

**Výhody:**

- kapacita je teoreticky neomezená
- velikost obsazené paměti je přímo závislá jen na počtu prvků, není zde žádné plýtvání
- rychlost přidávání i odebírání prvků je vždy stejně vysoká

**Nevýhody:**

- pomalý přístup k prvkům na zadaném indexu *i* (random access)
- uložené hodnoty nejsou v paměti uspořádány za sebou a změna struktury seznamu může způsobit fragmentaci volného místa v paměti
- pomalejší procházení (při každém posunu je nutná dereference ukazatele a skok na místo v paměti)
- stejné množství dat zabírá více paměti než stejné prvky uložené v poli (kvůli ukazatelům navíc)

### Implementace

#### Jednosměrně zřetězený seznam

Nejjednodušší jednosměrně zřetězený seznam s hlavičkou:

```java
import java.util.Iterator;

/**
 * Singly iterable linked list with head pointer only.
 *
 * @param <DATA> type of inner data values
 * @author Vojtěch Hordějčuk
 */
public class MySinglyLinkedList<DATA> implements Iterable<DATA> {
    private static class Node<DATA> {
        private DATA innerValue = null;
        private Node<DATA> next = null;
    }

    private Node<DATA> head = null;

    /**
     * Adds an element to the end of this list.
     *
     * @param value value to be added
     */
    public void add(DATA value) {
        Node<DATA> newNode = new Node<DATA>();
        newNode.innerValue = value;

        if (head == null) {
            // empty list
            head = newNode;
        } else {
            Node<DATA> temp = head;
            while (temp.next != null) {
                temp = temp.next;
            }
            temp.next = newNode;
        }
    }

    /**
     * Removes a value from this list.
     *
     * @param value value to be removed
     * @return TRUE if the value was found and removed, FALSE otherwise
     */
    public boolean remove(DATA value) {
        Node<DATA> temp = head;
        Node<DATA> prevOfTemp = null;

        while (temp != null) {
            if (temp.innerValue.equals(value)) {
                if (prevOfTemp == null) {
                    // removing head
                    head = head.next;
                    return true;
                } else {
                    prevOfTemp.next = temp.next;
                    return true;
                }
            }

            prevOfTemp = temp;
            temp = temp.next;
        }

        return false;
    }

    @Override
    public Iterator<DATA> iterator() {
        return new Iterator<DATA>() {
            private Node<DATA> next = head;

            @Override
            public boolean hasNext() {
                return next != null;
            }

            @Override
            public DATA next() {
                assert next != null;
                DATA nextValue = next.innerValue;
                next = next.next;
                return nextValue;
            }

            @Override
            public void remove() {
                // we can implement it, but better is to use the remove() method
                throw new UnsupportedOperationException();
            }
        };
    }
}
```

### Obousměrně zřetězený seznam

Obousměrně zřetězený seznam s hlavičkou i patičkou (všimněte si, že je implementace celkem jednoduchá, protože se tu objevuje symetrie - hlavička/patička, předchozí/následující prvek):

```java
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Doubly iterable linked list with both head and tail.
 *
 * @param <DATA> type of inner data values
 * @author Vojtěch Hordějčuk
 */
public class MyDoublyLinkedList<DATA> implements Iterable<DATA> {
    private static class Node<DATA> {
        private DATA innerValue = null;
        private Node<DATA> prev = null;
        private Node<DATA> next = null;
    }

    private Node<DATA> head = null;
    private Node<DATA> tail = null;

    /**
     * Adds an element to the end of this list.
     *
     * @param value value to be added
     */
    public void add(DATA value) {
        Node<DATA> newNode = new Node<DATA>();
        newNode.innerValue = value;

        if (head == null) {
            // empty list
            head = newNode;
            tail = newNode;
        } else {
            tail.next = newNode;
            newNode.prev = tail;
            tail = newNode;
        }
    }

    /**
     * Removes a value from this list.
     *
     * @param value value to be removed
     * @return TRUE if the value was found and removed, FALSE otherwise
     */
    public boolean remove(DATA value) {
        Node<DATA> temp = head;

        while (temp != null) {
            if (temp.innerValue.equals(value)) {
	            // fix "next" pointers
                if (temp == head) {
                    // move head
                    head = head.next;
                } else {
                    temp.prev.next = temp.next;
                }
	            // fix "prev" pointers
                if (temp == tail) {
                    // move tail
                    tail = tail.prev;
                } else {
                    temp.next.prev = temp.prev;
                }
                return true;
            }

            temp = temp.next;
        }

        return false;
    }

    @Override
    public Iterator<DATA> iterator() {
        return new Iterator<DATA>() {
            private Node<DATA> next = head;

            @Override
            public boolean hasNext() {
                return next != null;
            }

            @Override
            public DATA next() {
                assert next != null;
                DATA nextValue = next.innerValue;
                next = next.next;
                return nextValue;
            }

            @Override
            public void remove() {
                // we can implement it, but better is to use the remove() method
                throw new UnsupportedOperationException();
            }
        };
    }
}
```

### Reference

- http://cslibrary.stanford.edu/103/LinkedListBasics.pdf