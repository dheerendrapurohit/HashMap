class HashMap {
    constructor(initialCapacity = 8, loadFactor = 0.75) {
      this.capacity = initialCapacity;
      this.loadFactor = loadFactor;
      this.size = 0;
      this.buckets = Array(this.capacity).fill(null).map(() => []);
    }
  
    hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
        hashCode = hashCode % this.capacity; 
      }
      return hashCode;
    }
  
    resize() {
      const newCapacity = this.capacity * 2;
      const newBuckets = Array(newCapacity).fill(null).map(() => []);
  
      
      this.buckets.forEach(bucket => {
        bucket.forEach(([key, value]) => {
          const newIndex = this.hashWithCapacity(key, newCapacity);
          newBuckets[newIndex].push([key, value]);
        });
      });
  
      this.capacity = newCapacity;
      this.buckets = newBuckets;
    }
  
    
    hashWithCapacity(key, capacity) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
        hashCode = hashCode % capacity; 
      }
      return hashCode;
    }
  
    
    set(key, value) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
  
     
      for (let i = 0; i < bucket.length; i++) {
        const [existingKey, existingValue] = bucket[i];
        if (existingKey === key) {
          bucket[i][1] = value; 
          return;
        }
      }
  
      
      bucket.push([key, value]);
      this.size++;
  
     
      if (this.size / this.capacity > this.loadFactor) {
        this.resize();
      }
    }
  
   
    get(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
  
      
      for (let i = 0; i < bucket.length; i++) {
        const [existingKey, existingValue] = bucket[i];
        if (existingKey === key) {
          return existingValue;
        }
      }
  
      return null; 
    }
  
   
    has(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
  
      for (let i = 0; i < bucket.length; i++) {
        const [existingKey, existingValue] = bucket[i];
        if (existingKey === key) {
          return true;
        }
      }
  
      return false;
    }
  
    
    remove(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
  
      for (let i = 0; i < bucket.length; i++) {
        const [existingKey, existingValue] = bucket[i];
        if (existingKey === key) {
          bucket.splice(i, 1); 
          this.size--;
          return true;
        }
      }
  
      return false; 
    }
  
    
    length() {
      return this.size;
    }
  
    
    clear() {
      this.buckets = Array(this.capacity).fill(null).map(() => []);
      this.size = 0;
    }
  
    
    keys() {
      const keysArray = [];
      this.buckets.forEach(bucket => {
        bucket.forEach(([key, value]) => {
          keysArray.push(key);
        });
      });
      return keysArray;
    }
  
    
    values() {
      const valuesArray = [];
      this.buckets.forEach(bucket => {
        bucket.forEach(([key, value]) => {
          valuesArray.push(value);
        });
      });
      return valuesArray;
    }
  
    
    entries() {
      const entriesArray = [];
      this.buckets.forEach(bucket => {
        bucket.forEach(([key, value]) => {
          entriesArray.push([key, value]);
        });
      });
      return entriesArray;
    }
  }
  
 
  const test = new HashMap(); 
  
 
  test.set('apple', 'red');
  test.set('banana', 'yellow');
  test.set('carrot', 'orange');
  test.set('dog', 'brown');
  test.set('elephant', 'gray');
  test.set('frog', 'green');
  test.set('grape', 'purple');
  test.set('hat', 'black');
  test.set('ice cream', 'white');
  test.set('jacket', 'blue');
  test.set('kite', 'pink');
  test.set('lion', 'golden');
  test.set('apple', 'green');
  test.set('banana', 'brown');
  test.set('moon', 'silver');
  
  
  console.log(test.get('moon')); 
  console.log(test.has('frog')); 
  console.log(test.remove('hat')); 
  console.log(test.length()); 
  console.log(test.keys()); 
  console.log(test.values()); 
  console.log(test.entries()); 
  test.clear();
  console.log(test.length()); 
  