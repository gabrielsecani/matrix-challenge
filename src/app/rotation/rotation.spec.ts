import { Rotation } from '../rotation/rotation';

describe('Rotation', () => {

    it('should create', () => {
        let r = new Rotation([]);
        expect(r).toBeTruthy();
    });

    it('should rotate 2 sides array', () => {
        let r = new Rotation([1, 2, 3, 4]).rotate();
        const m = r.getVector();
        expect(m).toEqual([3, 1, 4, 2].join(','));
    });

    it('should rotate 3 sides array', () => {
        const r = new Rotation([1, 2, 3, 4, 5, 6, 7, 8, 9]).rotate();
        const m = r.getVector();
        expect(m).toEqual([4, 1, 2, 7, 5, 3, 8, 9, 6].join(','));
    });

    it('should rotate 1000 sides array', () => {
        const r = new Rotation(new Array(Math.pow(1000, 2)).map((_, i) => i)).rotate();
        const m = r.getVector();
        expect(m.length > 3).toBeTrue();
    });

});